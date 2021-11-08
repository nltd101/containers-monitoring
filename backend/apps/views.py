from django.shortcuts import render

# Create your views here.
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from apps.models.container import ContainerModel
from apps.models.order import OrderModel
from apps.models.package import PackageModel
from apps.models.kmean import KMeanModel
from rest_framework.request import Request
from apps.monitor import Monitor
from rest_framework.exceptions import APIException, ValidationError
from apps.utils import list_to_dict_factor

monitor = Monitor()
monitor.listen_factor()


class OrderView(APIView):
    def get(self, request: Request):
        order_id = request.query_params.get("order_id")
        if order_id:
            data = PackageModel.get_package_by_order_id(order_id)
            model: KMeanModel = KMeanModel.find_by_order_id(order_id)
            for e in data:
                if model:
                    e.update({"is_abnormal": model.predict(e.get("data"))})
                e.update({"data": list_to_dict_factor(e.get("data"))})

            return Response(
                {"data": data})
        return Response({"data": OrderModel.get_all_order()})


class ContainerView(APIView):
    """
    A view that can accept POST requests with JSON content.
    """

    def patch(self, request: Request):
        data = request.data
        #   "name"
        #   "route"
        #   "desciption"
        #   "start_time"
        #   "container"
        #   "category"
        return OrderModel.create(data)

    def get(self, request, format=None):
        containers = OrderModel.get_sorted_container_list()
        return Response({'data': containers})


class ContainerMonitorView(APIView):
    """
    A view that can accept POST requests with JSON content.
    """

    def get(self, request):
        records = PackageModel.objects.all()
        records.delete()
        return Response({"type": "delete_success"})

    def post(self, request: Request, format=None):
        id = request.data.get("container_id")
        package = PackageModel.create(container_id=id, data=request.data)
        return Response({"data": package})
