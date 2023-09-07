from django.urls import path
from .views import AddNumbersView
from .views import VehicleRoutingView

urlpatterns = [
    path('add/', AddNumbersView.as_view(), name='add-numbers'),
    path('routing/', VehicleRoutingView.as_view(), name='vehicle-routing'),
]
