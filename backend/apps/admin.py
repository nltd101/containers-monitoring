from django.contrib import admin
from apps.models.order import OrderModel
from apps.models.container import ContainerModel
from apps.models.kmean import KMeanModel

# Register your models here.


admin.site.register(ContainerModel)
admin.site.register(OrderModel)
admin.site.register(KMeanModel)
