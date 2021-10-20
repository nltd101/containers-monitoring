from django.shortcuts import render

# Create your views here.
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound


class Container(APIView):
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


class ContainerMonitor(APIView):
    """
    A view that can accept POST requests with JSON content.
    """

    def patch(self, request, id, format=None):
        response = {id: id}
        response.update(request.data)
        return Response(response)

    def post(self, request, format=None):

        return Response({'received data': request.data})
