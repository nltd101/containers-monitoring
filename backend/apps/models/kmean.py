from django.forms.models import model_to_dict
# Create your models here.
from django.db import models
from apps.models.container import ContainerModel
from apps.models.order import OrderModel


class KMeanModel(models.Model):

    co2_normal_center = models.FloatField(null=True,blank=True, default=-1)
    co2_normal_count = models.IntegerField(default=0)
    co2_abnormal_center = models.FloatField(null=True, blank=True, default=-1)
    co2_abnormal_count = models.IntegerField(default=0)

    vibration_normal_center = models.FloatField(null=True, blank=True, default=-1)
    vibration_normal_count = models.IntegerField(default=0)
    vibration_abnormal_center = models.FloatField(null=True, blank=True, default=-1)
    vibration_abnormal_count = models.IntegerField(default=0)

    humidity_normal_center = models.FloatField(null=True, blank=True, default=-1)
    humidity_normal_count = models.IntegerField(default=0)
    humidity_abnormal_center = models.FloatField(null=True, blank=True, default=-1)
    humidity_abnormal_count = models.IntegerField(default=0)

    temperature_normal_center = models.FloatField(null=True, blank=True, default=-1)
    temperature_normal_count = models.IntegerField(default=0)
    temperature_abnormal_center = models.FloatField(null=True, blank=True, default=-1)
    temperature_abnormal_count = models.IntegerField(default=0)

    def predict(self, list_data):
        co2_value = list_data[0][3]
        humidity_value = list_data[1][3]
        temperature_value = list_data[2][3]
        vibration_value = list_data[3][3]

        def predict_abnormal_facter(normal_center, abnormal_center, value):
            if abs(normal_center - value) > abs(abnormal_center - value):
                return True
            return False

        return {"co2":predict_abnormal_facter(self.co2_normal_center, self.co2_abnormal_center, co2_value),
            "temperature"  :  predict_abnormal_facter(self.temperature_normal_center, self.temperature_abnormal_center,
                                      temperature_value),
                  "humidity":predict_abnormal_facter(self.humidity_normal_center, self.humidity_abnormal_center,
                                        humidity_value),
            "vibration":    predict_abnormal_facter(self.vibration_normal_center, self.vibration_abnormal_center,
                                        vibration_value)}

    @classmethod
    def find_by_container_id(cls, container_id):
        container: ContainerModel = ContainerModel.find_by_id(container_id)
        if not container:
            return None
        order: OrderModel = OrderModel.get_by_id(container.order_id)
        if not order:
            return None
        model_set = cls.objects.filter(pk=order["category"])
        if not model_set:
            return None
        return model_set.first()

    @classmethod
    def find_by_order_id(cls, order_id):
        order: OrderModel = OrderModel.get_by_id(order_id)
        if not order:
            return None
        model_set = cls.objects.filter(pk=order["category"])
        if not model_set:
            return None
        return model_set.first()

    @classmethod
    def create_new_model(cls, category_id):
        model = cls.objects.create(id=category_id)
        return model

    def train(self, list_data):
        def train_factor(normal_center, normal_count, abnormal_center, abnormal_count, value) :
            def __move(center, value, count):
                count += 1
                center += (value - center) / count
                return center, count

            if  normal_center==-1 :
                normal_center, normal_count = __move(value, value, normal_count)
                return normal_center, normal_count, abnormal_center, abnormal_count
                pass
            if  abnormal_center == -1 :
                abnormal_center, abnormal_count = __move(value, value, abnormal_count)
                return normal_center, normal_count, abnormal_center, abnormal_count
                pass
            if normal_center > abnormal_center:
                normal_center, abnormal_center = abnormal_center, normal_center
                normal_count, abnormal_count = abnormal_count, normal_count

            if abs(value - abnormal_center) > abs(value - normal_center):
                normal_center, normal_count = __move(normal_center, value, normal_count)
                return normal_center, normal_count, abnormal_center, abnormal_count
                pass
            abnormal_center, abnormal_count = __move(abnormal_center, value, abnormal_count)
            return normal_center, normal_count, abnormal_center, abnormal_count

        co2_value = list_data[0][3]
        humidity_value = list_data[1][3]
        temperature_value = list_data[2][3]
        vibration_value = list_data[3][3]
        self.co2_normal_center, self.co2_normal_count, self.co2_abnormal_center, self.co2_abnormal_count = train_factor(
            self.co2_normal_center, self.co2_normal_count,
            self.co2_abnormal_center, self.co2_abnormal_count,
            co2_value)
        self.humidity_normal_center, self.humidity_normal_count, self.humidity_abnormal_center, self.humidity_abnormal_count = train_factor(
            self.humidity_normal_center, self.humidity_normal_count,
            self.humidity_abnormal_center, self.humidity_abnormal_count,
            humidity_value)
        self.temperature_normal_center, self.temperature_normal_count, self.temperature_abnormal_center, self.temperature_abnormal_count = train_factor(
            self.temperature_normal_center, self.temperature_normal_count,
            self.temperature_abnormal_center, self.temperature_abnormal_count,
            temperature_value)
        self.vibration_normal_center, self.vibration_normal_count, self.vibration_abnormal_center, self.vibration_abnormal_count = train_factor(
            self.vibration_normal_center, self.vibration_normal_count,
            self.vibration_abnormal_center, self.vibration_abnormal_count,
            vibration_value)

        self.save()

    def __str__(self) -> str:
        return str(self.pk) + "_"
