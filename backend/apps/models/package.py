from typing import List
from django.db.models.query import QuerySet
from rest_framework.exceptions import APIException, ValidationError
from django.forms.models import model_to_dict
from django.db import models
from django.db.models.expressions import F
from django.contrib.postgres.fields import ArrayField
# Create your models here.
from django.db import models

from apps.utils import dict_to_list_factor
from apps.models.order import OrderModel
from apps.models.container import ContainerModel


class PackageModel(models.Model):
    order = models.ForeignKey(OrderModel, on_delete=models.CASCADE)

    data_time = models.DateTimeField()

    # co2 humidity temperature vibration
    # max min mean variance
    data = ArrayField(ArrayField(models.FloatField(), size=4), size=4)

    @classmethod
    def push_by_order_id(cls, order_id, data: dict):

        data_time = data.get("data_time")
        json_data = data.get("json_data")
        order = OrderModel.objects.get(pk=order_id)
        data = dict_to_list_factor(json_data)
        package = cls.objects.create(
            order=order, data_time=data_time, data=data)
        return model_to_dict(package)

    @classmethod
    def push_by_container_id(cls, container_id, data: dict):

        containers: ContainerModel = ContainerModel.objects.filter(pk=container_id)
        if not containers:
            raise Exception
        order_id = containers.first().order_id
        data_time = data.get("data_time")
        json_data = data.get("json_data")
        orders = OrderModel.objects.filter(pk=order_id)
        if not orders:
            raise Exception
        data = dict_to_list_factor(json_data)
        if not data:
            raise Exception
        package = cls.objects.create(
            order=orders.first(), data_time=data_time, data=data)
        return model_to_dict(package)

    @classmethod
    def get_package_by_order_id(cls, order_id):
        orders = OrderModel.objects.filter(pk=order_id)
        if not orders:
            raise ValidationError(detail="no suck an order")
        object_array = cls.objects.filter(order=orders.first()).order_by("data_time")

        return [model_to_dict(e) for e in object_array]

    def __str__(self) -> str:
        return str(self.data_time)
