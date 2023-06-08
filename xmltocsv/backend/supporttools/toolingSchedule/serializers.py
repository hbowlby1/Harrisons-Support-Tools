from rest_framework import serializers
from .models import Tool, Machine, Manufacturer, Quantity_Requirements, Tool_Type, Max_Sharpen, Service

class ToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tool
        fields = "__all__"

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





