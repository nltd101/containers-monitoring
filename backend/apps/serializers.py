from django.contrib.auth.models import User, Group
from django.contrib.postgres import fields
from django.db import models
from rest_framework import serializers

from apps.models import OrderModel


class ContainerModelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = OrderModel
        fields = ['name', 'fee']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
