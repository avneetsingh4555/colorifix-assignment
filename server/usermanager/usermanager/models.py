from django.db import models



class Company(models.Model):

    name = models.CharField(max_length=50)

class PermissionGroup(models.Model):

    name = models.CharField(max_length=50)

class User(models.Model):

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=32)
    created_at = models.DateTimeField(auto_now_add=True)
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE)
    permission_group = models.ForeignKey(PermissionGroup, on_delete=models.CASCADE)

class Permissions(models.Model):
    access_name = models.CharField(max_length=32)
    p_group_id = models.ForeignKey(PermissionGroup, on_delete=models.CASCADE)
