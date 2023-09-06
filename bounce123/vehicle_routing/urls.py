from django.urls import path
from .views import AddNumbersView

urlpatterns = [
    path('add/', AddNumbersView.as_view(), name='add-numbers'),
]
