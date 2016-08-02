from django.contrib import admin

from .models import Person, Skill

admin.site.register([Person, Skill])