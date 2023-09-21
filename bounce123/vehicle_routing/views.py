from django.shortcuts import render
from .vrp import main
from .geocoding import getLatLong

# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import AddNumbersSerializer
from rest_framework import permissions


class SignInView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({'access_token': access_token}, status=status.HTTP_200_OK)


class AddNumbersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

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
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        requestData = request.data
        locationListForVr = []
        locationsLatLong = []
        try:
            for i in range(len(requestData['locations'])):
                location = requestData['locations'][i].split(" ")
                locationListForVr.append('+'.join(location))
                locationsLatLong.append(
                    getLatLong(requestData['locations'][i]))
            driverSize = requestData['driverSize']
            vehiclesCapacity = requestData['vehiclesCapacity']

            return Response({'result': main(locationListForVr, driverSize, vehiclesCapacity),
                             'locationsLatLong': locationsLatLong,
                             'locations': requestData['locations']
                             },)
        except:
            return Response({'result': "error"}, status=status.HTTP_400_BAD_REQUEST)
