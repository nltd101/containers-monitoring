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

    def __str__(self) -> str:
        return str(self.pk) + "_" + str(self.name)
