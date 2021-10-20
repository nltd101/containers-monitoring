from django.db import models
from django.db.models.expressions import F
from django.contrib.postgres.fields import ArrayField
# Create your models here.


class Container(models.Model):
    name = models.CharField(max_length=20)
    free = models.BooleanField(default=True)

    def __str__(self) -> str:
        return str(self.pk)+"_"+str(self.name)


class Package(models.Model):
    container = models.ForeignKey(Container, on_delete=models.CASCADE)
    data = ArrayField()
    data_time = models.DateField()

    @classmethod
    def push_package(cls, *args, **kwargs):
        return None

    def __str__(self) -> str:
        return str(self.container)+"_"+str(self.phone)+":"+str(self.created)
