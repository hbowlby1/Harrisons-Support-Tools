from django.urls import include, path
from rest_framework import routers

from .views import (
    ToolViewSet,
    MachineViewSet,
    ManufacturerViewSet,
    QuantityRequirementsViewSet,
    ToolTypeViewSet,
    MaxSharpenViewSet,
    ServiceViewSet,
    SerialClassViewSet
)


router = routers.DefaultRouter()
router.register('tools', ToolViewSet)
router.register('machines', MachineViewSet)
router.register('manufacturers', ManufacturerViewSet)
router.register('quantity_requirements', QuantityRequirementsViewSet)
router.register('tool_types', ToolTypeViewSet)
router.register('max_sharpens', MaxSharpenViewSet)
router.register('services', ServiceViewSet)
router.register('tool_class', SerialClassViewSet)

urlpatterns = [
    # Other URL patterns
    path('', include(router.urls)),
]