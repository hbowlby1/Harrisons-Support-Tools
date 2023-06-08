from django.shortcuts import render
from django.http import Http404

#DRF
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, status

#serializers
from .serializers import ToolSerializer, MachineSerializer, ManufacturerSerializer, QauntityRequirementsSerializer, ToolTypeSerializer, ServiceSerializer

#model imports
from .models import Tool, Machine, Manufacturer, Quantity_Requirements, Tool_Type, Max_Sharpen, Service

# Create your views here.
class ListToolingInfo(APIView):
    #retrieve all the tools
    def get(self, request, format=None):
        tools = Tool.objects.all()
        serializer = ToolSerializer(tools, many=True)
        return Response(serializer.data)
    
    #create a new tool
    def post(self, request, format=None):
        serializer = ToolSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# view, update and delete view for one tool
class ToolDetail(APIView):
    def get_object(self, pk):
        try:
            return Tool.objects.get(pk=pk)
        except Tool.DoesNotExist:
            raise Http404
    
    #get one tool
    def get(self, request, pk, format=None):
        tools = self.get_object(pk)
        serializer = ToolSerializer(tools)
        return Response(serializer.data)
    
    #update an existing tool
    def put(self, request, pk, format=None):
        tools = self.get_object(pk)
        serailizer = ToolSerializer(tools, data=request.data)
        if serailizer.is_valid():
            serailizer.save()
            return Response(serailizer.data)
        return Response(serailizer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        tools = self.get_object(pk)
        tools.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)