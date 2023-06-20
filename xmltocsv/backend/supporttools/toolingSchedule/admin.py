from django.contrib import admin
from .models import Tool, Machine, Manufacturer, Quantity_Requirements, Tool_Type, Max_Sharpen, Service, ToolSerialClass
# Register your models here.

admin.site.register(Tool)
admin.site.register(Machine)
admin.site.register(Manufacturer)
admin.site.register(Quantity_Requirements)
admin.site.register(Tool_Type)
admin.site.register(Max_Sharpen)
admin.site.register(Service)
admin.site.register(ToolSerialClass)
