from dataclasses import field, fields
from rest_framework import serializers
from .models import Company, User


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('id', 'name')


class UserSerializer(serializers.ModelSerializer):
    company = CompanySerializer(source='company_id', many=False)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'company')
