from rest_framework.exceptions import ValidationError
from django.forms.models import model_to_dict
from django.db import models
from django.db.models.expressions import F
from django.contrib.postgres.fields import ArrayField
# Create your models here.
from django.db import models

from apps.utils import json_to_array_factor


class ContainerModel(models.Model):
    name = models.CharField(max_length=20)
    order_id = models.IntegerField(null=True)

    def __str__(self) -> str:
        return str(self.pk)+"_"+str(self.name)


class OrderModel(models.Model):
    name = models.CharField(max_length=100)
    route = models.CharField(max_length=300)
    desciption = models.TextField(null=True, blank=True)
    start_time = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)
    category = models.IntegerField(default=0)
    container = models.ForeignKey(ContainerModel, on_delete=models.CASCADE)

    @classmethod
    def create(cls, data: dict):
        name = data.get("name")
        route = data.get("route")
        desciption = data.get("desciption")
        start_time = data.get("start_time")
        container = ContainerModel.objects.get(pk=data.get("container"))
        category = data.get("category")
        data = cls.objects.create(name=name, route=route, desciption=desciption,
                                  start_time=start_time, category=category, container=container)
        return model_to_dict(data)


class PackageModel(models.Model):
    order = models.ForeignKey(OrderModel, on_delete=models.CASCADE)

    data_time = models.DateTimeField()

    # co2 humidity temperature vibration
    # max min mean variance
    data = ArrayField(ArrayField(models.FloatField(), size=4), size=4)

    @classmethod
    def create(cls, order_id, data: dict):

        data_time = data.get("data_time")
        json_data = data.get("json_data")
        order = OrderModel.objects.get(pk=order_id)
        data = json_to_array_factor(json_data)
        object = cls.objects.create(
            order=order, data_time=data_time, data=data)
        return model_to_dict(object)

    @classmethod
    def create(cls, container_id, data: dict):
        container: ContainerModel = ContainerModel.objects.get(pk=container_id)
        if not container:
            raise ValidationError
        order_id = container.order_id
        data_time = data.get("data_time")
        json_data = data.get("json_data")
        order = OrderModel.objects.get(pk=order_id)
        # if not OR:
        #     raise ValidationError
        data = json_to_array_factor(json_data)
        if not data:
            raise ValidationError
        object = cls.objects.create(
            order=order, data_time=data_time, data=data)
        return model_to_dict(object)

    @ classmethod
    def get_package_by_order_id(cls, order_id):
        object_array = cls.objects.filter(order=OrderModel.objects.get(
            pk=order_id)).order_by("data_time")
        return [model_to_dict(object) for object in object_array]

    def __str__(self) -> str:
        return str(self.data_time)
