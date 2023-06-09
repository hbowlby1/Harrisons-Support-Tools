from django.urls import path

from . import views

urlpatterns = [
    path("", views.ListToolingInfo.as_view(), name="toolList"),
    path("<int:pk>", views.ToolDetail.as_view(), name="toolUpdate"),
    path("machine", views.ListMachineInfo.as_view(), name="all_machines"),
    path("machine/<int:pk>", views.MachineDetail.as_view(), name="machine"),
    path("manufacturer", views.ListManufacturerInfo.as_view(), name="manufacturerList"),
    path("manufacturer/<int:pk>", views.ManufacturerDetail.as_view(), name="manufacturer"),
    path("quantity", views.QuantityRequirementsInfo.as_view(), name="quantities"),
    path("quantity/<int:pk>", views.QuantityRequirementsDetail.as_view(), name="quantity"),
    path("tool-type", views.ListToolTypeInfo.as_view(), name="tool-types"),
    path("tool-type/<int:pk>", views.ToolTypeDetail.as_view(), name="tool-type"),
    path("sharpen", views.ListMaxSharpen.as_view(), name="max-sharpens"),
    path("sharpen/<int:pk>", views.MaxSharpenDetail.as_view(), name="sharpen"),
    path("service", views.ListServiceInfo.as_view(), name="services"),
    path("service/<int:pk>", views.ServiceDetail.as_view(), name="service")
]
