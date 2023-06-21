from rest_framework import serializers
from .models import Tool, Machine, Manufacturer, Quantity_Requirements, Tool_Type, Max_Sharpen, Service, ToolSerialClass

class MachineSerializer(serializers.ModelSerializer):
    tool_id = serializers.ReadOnlyField(source='tool.id')
    class Meta:
        model = Machine
        fields = "__all__"

class ManufacturerSerializer(serializers.ModelSerializer):
    tool_id = serializers.ReadOnlyField(source='tool.id')
    class Meta:
        model = Manufacturer
        fields = "__all__"

class QauntityRequirementsSerializer(serializers.ModelSerializer):
    tool_id = serializers.ReadOnlyField(source='tool.id')
    class Meta:
        model = Quantity_Requirements
        fields = "__all__"

class ToolTypeSerializer(serializers.ModelSerializer):
    tool_id = serializers.ReadOnlyField(source='tool.id')
    class Meta:
        model = Tool_Type
        fields = "__all__"

class SharpenSerializer(serializers.ModelSerializer):
    tool_id = serializers.ReadOnlyField(source='tool.id')
    class Meta:
        model = Max_Sharpen
        fields = "__all__"

class ServiceSerializer(serializers.ModelSerializer):
    tool_id = serializers.ReadOnlyField(source='tool.id')
    class Meta:
        model = Service
        fields = "__all__"


class ToolSerialClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolSerialClass
        fields = "__all__"

class ToolSerializer(serializers.ModelSerializer):
    machine_set = MachineSerializer(read_only=True, many=True)
    manufacturer_set = ManufacturerSerializer(read_only=True, many=True)
    quantity_requirements_set = QauntityRequirementsSerializer(read_only=True, many=True)
    tool_type_set = ToolTypeSerializer(read_only=True, many=True)
    max_sharpen_set = SharpenSerializer(read_only=True, many=True)
    service_set = ServiceSerializer(read_only=True, many=True)
    tool_serial_class = ToolSerialClassSerializer(read_only=True)
    class Meta:
        model = Tool
        fields = "__all__"