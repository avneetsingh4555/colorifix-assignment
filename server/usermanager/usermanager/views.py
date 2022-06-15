import imp
from django.http import JsonResponse
from .models import User, PermissionGroup, Company
from .serializers import PermissionGroupSerializer, UserSerializer, CompanySerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET', 'POST'])
def register_user(request):
    if request.method == 'GET':
        users = User.objects.all()
        # print(users[0].company_id.name)
        serializer = UserSerializer(users, many=True)
        return JsonResponse({'users': serializer.data})

    if request.method == 'POST':
        print(request.data)
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            print('abcd')
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)


def get_company(request):

    if request.method == 'GET':
        print('hello')
        permissions = PermissionGroup.objects.all()
        companies = Company.objects.all()
        pms = PermissionGroupSerializer(permissions, many=True)
        cmp = CompanySerializer(companies, many=True)
        entities = {
            'pms': pms.data,
            'cmp': cmp.data,
        }
        return JsonResponse({'data': entities})


@api_view(["POST"])
def add_permission_group(request):
    if request.method == 'POST':
        serializer = PermissionGroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
