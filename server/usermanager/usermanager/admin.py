from django.contrib import admin
from .models import *


admin.site.register(Company)
admin.site.register(PermissionGroup)
admin.site.register(Permissions)
admin.site.register(User)