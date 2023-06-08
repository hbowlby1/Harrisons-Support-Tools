from django.urls import path

from . import views

urlpatterns = [
    path("", views.ListToolingInfo.as_view(), name="toolList"),
    path("<int:pk>", views.ToolDetail.as_view(), name="toolUpdate")
]
