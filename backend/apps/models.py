from typing import List
from django.db.models.query import QuerySet
from rest_framework.exceptions import APIException, ValidationError
from django.forms.models import model_to_dict
from django.db import models
from django.db.models.expressions import F
from django.contrib.postgres.fields import ArrayField
# Create your models here.
from django.db import models

from apps.utils import json_to_array_factor


class ContainerModel(models.Model):
    name = models.CharField(max_length=20)
    order_id = models.IntegerField(null=True,blank=True)

    @classmethod
    def get_sorted_container_list(cls):
        containers:QuerySet[ContainerModel] = cls.objects.all().order_by("order_id")
        busy_container =[]
        free_container=[]
        for container_object in containers:
            order:OrderModel = OrderModel.get_by_id(container_object.order_id)
            container_data=model_to_dict(container_object)
            if (order):
                print(order)
                container_data.update({"start_time":order.start_time})
                container_data.update({"last_update":order.last_update})
                container_data.update({"free":False})
                busy_container.append(container_data)
           
            else:
                container_data.update({"start_time":None})
                container_data.update({"last_update":None})
                container_data.update({"free":True})
                free_container.append(container_data)
        busy_container.sort(key=lambda x:x["start_time"])
        busy_container.extend(free_container)
        return busy_container


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

    def __str__(self) -> str:
        return str(self.pk)

    @classmethod
    def get_by_id(cls,id):
        result = cls.objects.filter(pk=id)
        if not result:
            raise ValidationError(detail="no such an order")
        return model_to_dict(result.first())

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

    @classmethod
    def get_all_order(cls,page=0,step=10):
        data_object = cls.objects.all().order_by("-start_time")[page*step:(page+1)*step]
        print(data_object)
       
        return [model_to_dict(object) for object in data_object]

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
            raise ValidationError(detail="no such a container")
        order_id = container.order_id
        data_time = data.get("data_time")
        json_data = data.get("json_data")
        order = OrderModel.objects.get(pk=order_id)
      
        data = json_to_array_factor(json_data)
        if not data:
            raise ValidationError(detail="the data format is invalid")
        object = cls.objects.create(
            order=order, data_time=data_time, data=data)
        return model_to_dict(object)

 
    @ classmethod
    def get_package_by_order_id(cls, order_id):
        orders = OrderModel.objects.filter(pk=order_id)
        if not orders:
            raise ValidationError(detail="no suck an order")
        object_array = cls.objects.filter(order=orders.first()).order_by("data_time")
      
        return [model_to_dict(object) for object in object_array]

    def __str__(self) -> str:
        return str(self.data_time)
