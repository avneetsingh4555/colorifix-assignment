from django.db import models


class Company(models.Model):

    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name

class PermissionGroup(models.Model):

    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name

class User(models.Model):

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    company_id = models.ForeignKey(Company, on_delete=models.CASCADE, null= True)
    permission_group = models.ForeignKey(PermissionGroup, on_delete=models.CASCADE, null= True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name

class Permission(models.Model):
    access_name = models.CharField(max_length=32)
    def __str__(self):
        return self.access_name

class UserPermission(models.Model):

    p_id = models.ForeignKey(Permission, on_delete=models.CASCADE)
    p_group_id = models.ForeignKey(PermissionGroup, on_delete=models.CASCADE)
    
