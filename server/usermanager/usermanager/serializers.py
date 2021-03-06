from dataclasses import field, fields
from urllib import response
from rest_framework import serializers
from .models import Company, User, PermissionGroup

#CompanySerializer for handling user data

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ('id', 'name')


#PermissionGroupSerializer for handling user data

class PermissionGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermissionGroup
        fields = ('id', 'name')



#Userserializer for handling user data

class UserSerializer(serializers.ModelSerializer):
    company = CompanySerializer(
        source='company_id', many=False, read_only=True)
    p_group = PermissionGroupSerializer(
        source='permission_group', many=False, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email',
                  'company_id', 'permission_group', 'company', 'p_group')
