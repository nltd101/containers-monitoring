import random
import time

from paho.mqtt import client as mqtt_client
import json

broker = '075f7b803efc48c687b90c647a81607e.s1.eu.hivemq.cloud'
port = 8883
topic = "container/temp"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 1000)}'
username = 'minh123'
password = 'Minh12125450'


def connect_mqtt():
    def on_connect(client: mqtt_client.Client, userdata, flags, rc):
        print("running")
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.username_pw_set(username, password)
    client.tls_set(tls_version=mqtt_client.ssl.PROTOCOL_TLS)
    client.on_connect = on_connect
    client.connect(broker, port)

    return client


import datetime


def publish(client: mqtt_client.Client):
    msg_count = 0
    while msg_count < 30:
        time.sleep(1)
        msg = f"messages: {msg_count}"
        data_datetime = datetime.datetime.now()
        data_datetime += datetime.timedelta(minutes=msg_count * 15)
        json_data = {
            "container_id": 1,
            "data_time": str(data_datetime),
            "json_data": {
                "co2": {"max": 3.4 + random.randint(-10, 10) / 10, "min": 2.5 + random.randint(-10, 10) / 10,
                        "mean": 3 + random.randint(-10, 10) / 10, "variance": 1 + random.randint(-10, 10) / 10},
                "humidity": {"max": 3.4 + random.randint(-10, 10) / 10, "min": 2.5 + random.randint(-10, 10) / 10,
                             "mean": 3 + random.randint(-10, 10) / 10, "variance": 1 + random.randint(-10, 10) / 10},
                "temperature": {"max": 3.4 + random.randint(-10, 10) / 10, "min": 2.5 + random.randint(-10, 10) / 10,
                                "mean": 3 + random.randint(-10, 10) / 10, "variance": 1 + random.randint(-10, 10) / 10},
                "vibration": {"max": 3.4 + random.randint(-10, 10) / 10, "min": 2.5 + random.randint(-10, 10) / 10,
                              "mean": 3 + random.randint(-10, 10) / 10, "variance": 1 + random.randint(-10, 10) / 10}
            }}
        print(json_data)
        msg = json.dumps(json_data)
        result = client.publish(topic, msg)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            print(f"Send `{msg}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
        msg_count += 1


def subscribe(client: mqtt_client.Client):
    def on_message(client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")

    client.subscribe(topic)
    client.on_message = on_message


def run():
    client = connect_mqtt()
    # subscribe(client)
    # client.loop_forever()

    client.loop_start()
    publish(client)


if __name__ == '__main__':
    run()
