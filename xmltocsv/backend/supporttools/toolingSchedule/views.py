from django.shortcuts import render
from django.http import Http404

#DRF
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import authentication, permissions, status

#serializers
from .serializers import ToolSerializer, MachineSerializer, ManufacturerSerializer, QauntityRequirementsSerializer, ToolTypeSerializer, ServiceSerializer, SharpenSerializer

#model imports
from .models import Tool, Machine, Manufacturer, Quantity_Requirements, Tool_Type, Max_Sharpen, Service

#Tool
class ToolViewSet(viewsets.ModelViewSet):
    queryset = Tool.objects.all()
    serializer_class = ToolSerializer

class MachineViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer

class ManufacturerViewSet(viewsets.ModelViewSet):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer

class QuantityRequirementsViewSet(viewsets.ModelViewSet):
    queryset = Quantity_Requirements.objects.all()
    serializer_class = QauntityRequirementsSerializer

class ToolTypeViewSet(viewsets.ModelViewSet):
    queryset = Tool_Type.objects.all()
    serializer_class = ToolTypeSerializer

class MaxSharpenViewSet(viewsets.ModelViewSet):
    queryset = Max_Sharpen.objects.all()
    serializer_class = SharpenSerializer

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer