from django.shortcuts import render

# Create your views here.
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from apps.models import OrderModel, PackageModel
from rest_framework.request import Request


class OrderView(APIView):
    def patch(self,  request: Request):

        data = OrderModel.create(request.data)
        print(data)
        return Response({"data": data})


class ContainerView(APIView):
    """
    A view that can accept POST requests with JSON content.
    """

    def post(self, request, format=None):

        return Response({'received data': request.data})

    def get(self, request, format=None):
        data = [{"id": "023", "name": "Container so 2",
                 "start_time": "10/20/20221 10:20:15",
                 "last_update": "2025/10/5T8:10:33", "free": False},
                {"id": "023", "name": "Container so 2",
                "start_time": "10/20/20221 10:20:15",
                 "last_update": "2025/10/5T8:10:33", "free": False},
                {"id": "023", "name": "Container so 2",
                "start_time": "10/20/20221 10:20:15",
                 "last_update": "2025/10/5T8:10:33", "free": True},
                {"id": "023", "name": "Container so 2",
                "start_time": "10/20/20221 10:20:15",
                 "last_update": "2025/10/5T8:10:33", "free": True}]
        return Response({'data': data})


class ContainerMonitorView(APIView):
    """
    A view that can accept POST requests with JSON content.
    """

    def post(self, request: Request, format=None):
        id = request.data.get("container_id")
        package = PackageModel.create(container_id=id, data=request.data)

        return Response({"data": package})

    def get(self, request: Request,  format=None):
        id = request.query_params.get("container_id")
        if not id:
            raise(NotFound)
        return Response({"data": PackageModel.get_package_by_order_id(id)})
