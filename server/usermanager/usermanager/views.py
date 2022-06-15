import imp
from django.http import JsonResponse
from .models import User
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
@api_view(['GET', 'POST'])

def register_user(request):
    if request.method == 'GET':
        users = User.objects.all()
        # print(users[0].company_id.name)
        serializer = UserSerializer(users, many = True)
        return JsonResponse({'users': serializer.data})


    if request.method == 'POST':
        print('hello')
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            print('abcd')
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
    
