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


class ContainerModel(models.Model):
    name = models.CharField(max_length=20)
    order_id = models.IntegerField(null=True, blank=True)

    @classmethod
    def find_by_id(cls, container_id):
        containers: ContainerModel = cls.objects.filter(pk=container_id)
        if not containers:
            return None
        return containers.first()

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
        return str(self.pk) + "_" + str(self.name)
