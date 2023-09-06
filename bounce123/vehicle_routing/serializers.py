# serializers.py
from rest_framework import serializers


class AddNumbersSerializer(serializers.Serializer):
    num1 = serializers.FloatField()
    num2 = serializers.FloatField()
