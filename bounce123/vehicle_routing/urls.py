from django.urls import path
from .views import AddNumbersView
from .views import VehicleRoutingView
from .views import SignInView

urlpatterns = [
    path('add/', AddNumbersView.as_view(), name='add-numbers'),
    path('sign-in/', SignInView.as_view(), name='sign-in'),
    path('routing/', VehicleRoutingView.as_view(), name='vehicle-routing'),
]
