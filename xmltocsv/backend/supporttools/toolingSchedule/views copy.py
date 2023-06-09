from django.shortcuts import render
from django.http import Http404

#DRF
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, status

#serializers
from .serializers import ToolSerializer, MachineSerializer, ManufacturerSerializer, QauntityRequirementsSerializer, ToolTypeSerializer, ServiceSerializer, SharpenSerializer

#model imports
from .models import Tool, Machine, Manufacturer, Quantity_Requirements, Tool_Type, Max_Sharpen, Service

#Tool
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

#Machine
class ListMachineInfo(APIView):
    #retrieve all machine info
    
    def get(self, request, format=None):
        machines = Machine.objects.all()
        serializer = MachineSerializer(machines, many=True)
        return Response(serializer.data)
    
    #create a new machine
    def post(self, request, format=None):
        serializer = MachineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# view update delete and view for one machine
class MachineDetail(APIView):
    #find the machine based on it's primary key (pk = id)
    def get_object(self, pk):
        try:
            return Machine.objects.get(pk=pk)
        except Machine.DoesNotExist:
            raise Http404
    
    #get one machine
    def get(self, request, pk, format=None):
        machine = self.get_object(pk)
        serializer = MachineSerializer(machine)
        return Response(serializer.data)
    
    #update existing machine
    def put(self, request, pk, format=None):
        machine = self.get_object(pk)
        serializer = MachineSerializer(machine, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        machine = self.get_object(pk)
        machine.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
#manufacturer
class ListManufacturerInfo(APIView):
    #retrieve all manufacturers info
    
    def get(self, request, format=None):
        manufacturers = Manufacturer.objects.all()
        serializer = ManufacturerSerializer(manufacturers, many=True)
        return Response(serializer.data)
    
    #create a new Manufacturer
    def post(self, request, format=None):
        serializer = ManufacturerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# view update delete and view for one manufacturer
class ManufacturerDetail(APIView):
    #find the machine based on it's primary key (pk = id)
    def get_object(self, pk):
        try:
            return Manufacturer.objects.get(pk=pk)
        except Manufacturer.DoesNotExist:
            raise Http404
    
    #get one manufacturer
    def get(self, request, pk, format=None):
        manufacturer = self.get_object(pk)
        serializer = ManufacturerSerializer(manufacturer)
        return Response(serializer.data)
    
    #update existing manufacturer
    def put(self, request, pk, format=None):
        manufacturer = self.get_object(pk)
        serializer = ManufacturerSerializer(manufacturer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        manufacturer = self.get_object(pk)
        manufacturer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
#Quantity_Requirements
class QuantityRequirementsInfo(APIView):
    #retrieve all quantity requirements
    def get(self, request, format=None):
        quantities = Quantity_Requirements.objects.all()
        serializer = QauntityRequirementsSerializer(quantities, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = QauntityRequirementsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# view, update and delete view for one quantity requirement
class QuantityRequirementsDetail(APIView):
    def get_object(self, pk):
        try:
            return Quantity_Requirements.objects.get(pk=pk)
        except Quantity_Requirements.DoesNotExist:
            raise Http404
        
    #get one quantity
    def get(self, request, pk, format=None):
        quantity = self.get_object(pk)
        serializer = QauntityRequirementsSerializer(quantity)
        return Response(serializer.data)
    
    #update single quantity
    def put(self, request, pk, format=None):
        quantity = self.get_object(pk)
        seralizer = QauntityRequirementsSerializer(quantity, data=request.data)
        if seralizer.is_valid():
            seralizer.save()
            return Response(seralizer.data)
        return Response(seralizer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        quantity = self.get_object(pk)
        quantity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
#tool type
class ListToolTypeInfo(APIView):
    #retrieve all tooltypes
    def get(self, request, format=None):
        toolTypes = Tool_Type.objects.all()
        serializer = ToolTypeSerializer(toolTypes, many=True)
        return Response(serializer.data)
    
    #create new tool type
    def post(self, request, format=None):
        serializer = ToolTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# view, update, delete tool types
class ToolTypeDetail(APIView):
    def get_object(self, pk):
        try:
            return Tool_Type.objects.get(pk=pk)
        except Tool_Type.DoesNotExist:
            raise Http404
        
    #get one tool_type
    def get(self, request, pk, format=None):
        toolType = self.get_object(pk)
        serializer = ToolTypeSerializer(toolType)
        return Response(serializer.data)
    
    #update tool_type
    def put(self, request, pk, format=None):
        toolType = self.get_object(pk)
        serializer = ToolTypeSerializer(toolType, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        toolType = self.get_object(pk)
        toolType.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#Max Sharpen
class ListMaxSharpen(APIView):
    #retrieve all Max Sharpen
    def get(self, request, format=None):
        maxSharpens = Max_Sharpen.objects.all()
        serializer = SharpenSerializer(maxSharpens, many=True)
        return Response(serializer.data)
    
    #create new Max Sharpen
    def post(self, request, format=None):
        serializer = SharpenSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# view, update, delete max sharpen
class MaxSharpenDetail(APIView):
    def get_object(self, pk):
        try:
            return Max_Sharpen.objects.get(pk=pk)
        except Max_Sharpen.DoesNotExist:
            raise Http404
        
    #get one max sharpen
    def get(self, request, pk, format=None):
        maxSharpen = self.get_object(pk)
        serializer = SharpenSerializer(maxSharpen)
        return Response(serializer.data)
    
    #update max sharpen
    def put(self, request, pk, format=None):
        maxSharpen = self.get_object(pk)
        serializer = SharpenSerializer(maxSharpen, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        maxSharpen = self.get_object(pk)
        maxSharpen.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#Service
class ListServiceInfo(APIView):
    #retrieve all Services
    def get(self, request, format=None):
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)
    
    #create new Max service
    def post(self, request, format=None):
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# view, update, delete service
class ServiceDetail(APIView):
    def get_object(self, pk):
        try:
            return Service.objects.get(pk=pk)
        except Service.DoesNotExist:
            raise Http404
        
    #get one Service
    def get(self, request, pk, format=None):
        service = self.get_object(pk)
        serializer = ServiceSerializer(service)
        return Response(serializer.data)
    
    #update Service
    def put(self, request, pk, format=None):
        service = self.get_object(pk)
        serializer = ServiceSerializer(service, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        service = self.get_object(pk)
        service.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)