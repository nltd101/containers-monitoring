import json
import random
import time

from paho.mqtt import client as mqtt_client
from apps.utils import dict_to_list_factor

broker = '075f7b803efc48c687b90c647a81607e.s1.eu.hivemq.cloud'
port = 8883
topic = "container/temp"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 1000)}'
username = 'minh123'
password = 'Minh12125450'


class Monitor:
    def __init__(self) -> None:

        def on_connect(client: mqtt_client.Client, userdata, flags, rc):
            print("running")
            if rc == 0:
                print("Connected to MQTT Broker!")
            else:
                print("Failed to connect, return code %d\n", rc)

        self.client = mqtt_client.Client(client_id)
        self.client.username_pw_set(username, password)
        self.client.tls_set(tls_version=mqtt_client.ssl.PROTOCOL_TLS)
        self.client.on_connect = on_connect
        self.client.connect(broker, port)

    # def publish(self, client:mqtt_client.Client):
    #     msg_count = 0
    #     while True:
    #         time.sleep(1)
    #         msg = f"messages: {msg_count}"
    #         result = client.publish(topic, msg)
    #         # result: [0, 1]
    #         status = result[0]
    #         if status == 0:
    #             print(f"Send `{msg}` to topic `{topic}`")
    #         else:
    #             print(f"Failed to send message to topic {topic}")
    #         msg_count += 1
    def __subscribe(self):
        from apps.models.package import PackageModel
        from apps.models.kmean import KMeanModel
        from apps.models.container import ContainerModel
        from apps.models.order import OrderModel
        def on_message(client, userdata, msg):
            print(msg.payload.decode())
            package_data = json.loads(msg.payload.decode())
            print(str(package_data.get("data_time")))

            PackageModel.push_by_container_id(package_data.get("container_id"), package_data)
            model = KMeanModel.find_by_container_id(package_data.get("container_id"))
            if not model:
                container = ContainerModel.find_by_id(package_data.get("container_id"))
                order = OrderModel.get_by_id(container.order_id)
                model: KMeanModel = KMeanModel.create_new_model(order["category"])
            model.train(dict_to_list_factor(package_data.get("json_data")))
            # print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

        self.client.subscribe(topic)
        self.client.on_message = on_message

    def listen_factor(self):
        self.__subscribe()
        self.client.loop_start()
