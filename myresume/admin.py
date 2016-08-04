from django.contrib import admin

from .models import Person, Skill, MyContent

admin.site.register([Person, Skill, MyContent])