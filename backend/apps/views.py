from django.shortcuts import render

# Create your views here.
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from apps.models import ContainerModel, OrderModel, PackageModel
from rest_framework.request import Request


class OrderView(APIView):
    def get(self,request:Request):
        order_id = request.query_params.get("order_id")
        if (order_id):
            return Response({"data":PackageModel.get_package_by_order_id(order_id)})
        return Response({"data":OrderModel.get_all_order()})

class ContainerView(APIView):
    """
    A view that can accept POST requests with JSON content.
    """
    def patch(self,request:Request):
        data= request.data
    #   "name"
    #   "route"
    #   "desciption"
    #   "start_time"
    #   "container"
    #   "category"
        return OrderModel.create(data)

    def get(self, request, format=None):
        containers = ContainerModel.get_sorted_container_list()
        return Response({'data': containers})


class ContainerMonitorView(APIView):
    """
    A view that can accept POST requests with JSON content.
    """

    def post(self, request: Request, format=None):
        id = request.data.get("container_id")
        package = PackageModel.create(container_id=id, data=request.data)
        return Response({"data": package})


