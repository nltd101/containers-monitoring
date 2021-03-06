from typing import List
from django.db.models.query import QuerySet
from rest_framework.exceptions import APIException, ValidationError
from django.forms.models import model_to_dict
from django.db import models
from django.db.models.expressions import F
from django.contrib.postgres.fields import ArrayField
# Create your models here.
from django.db import models
from apps.models.container import ContainerModel



class OrderModel(models.Model):
    name = models.CharField(max_length=100)
    route = models.CharField(max_length=300)
    description = models.TextField(null=True, blank=True)
    start_time = models.DateTimeField(auto_now_add=True, editable=True)
    last_update = models.DateTimeField(auto_now=True)
    category = models.IntegerField(default=0, editable=True)
    container = models.ForeignKey(ContainerModel, on_delete=models.CASCADE)
    expect  = models.JSONField(default={"co2":400,"temp":26,"humidity":88,"vibration":0})
    def __str__(self) -> str:
        return str(self.pk)



    @classmethod
    def get_by_id(cls, id):
        result = cls.objects.filter(pk=id)
        if not result:
            return None
        return result.values()[0]  # model_to_dict(result.first())

    @classmethod
    def create(cls, data: dict):
        name = data.get("name")
        route = data.get("route")
        description = data.get("description")
        start_time = data.get("time_start")
        containers:QuerySet[ContainerModel] = ContainerModel.objects.filter(pk=data.get("container"))
        if not containers:
            raise ValidationError(detail="so such a container")
        
        category = data.get("category")
        container =containers.first()
        data:OrderModel = cls.objects.create(name=name, route=route, description=description,
                                  start_time=start_time, category=category, container=container)
        print(data)
        container.order_id = data.id
        container.save()
        result= model_to_dict(data)
        result.update({"start_time":data.start_time,"last_update":data.last_update})
        return result

    @classmethod
    def get_all_order(cls, page=0, step=10):
        data_object = cls.objects.all().order_by("-start_time")[page * step:(page + 1) * step]
        print(data_object)

        return data_object.values()

    @classmethod
    def get_sorted_container_list(cls):
        containers: QuerySet[ContainerModel] = ContainerModel.objects.all().order_by("order_id")
        busy_container = []
        free_container = []
        for container_object in containers:
            order: OrderModel = cls.get_by_id(container_object.order_id)
            container_data = model_to_dict(container_object)
            if order:
                print(order)
                container_data.update({"start_time": order.get('start_time')})
                container_data.update({"last_update": order.get('last_update')})
                container_data.update({"free": False})
                busy_container.append(container_data)

            else:
                container_data.update({"start_time": None})
                container_data.update({"last_update": None})
                container_data.update({"free": True})
                free_container.append(container_data)
        busy_container.sort(key=lambda x: x["start_time"])
        busy_container.reverse()
        busy_container.extend(free_container)
        return busy_container
