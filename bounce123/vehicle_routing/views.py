from django.shortcuts import render
from .vrp import main
from .geocoding import getLatLong

# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import AddNumbersSerializer


class AddNumbersView(APIView):
    def post(self, request):
        serializer = AddNumbersSerializer(data=request.data)

        if serializer.is_valid():
            num1 = serializer.validated_data['num1']
            num2 = serializer.validated_data['num2']
            result = num1 + num2
            return Response({'result': result}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Create your views here.
class VehicleRoutingView(APIView):
    def post(self, request):
        locationsList = request.data
        locationListForVr = []
        locationsLatLong = []
        for i in range(len(locationsList['locations'])):
            location = locationsList['locations'][i].split(" ")
            locationListForVr.append('+'.join(location))
            locationsLatLong.append(getLatLong(locationsList['locations'][i]))

        return Response({'result': main(locationListForVr),
                         'locationsLatLong': locationsLatLong})
