from django.contrib import admin

from .models import Person, Skill, MyContent, Job, Course, Contact

admin.site.register([Person, Skill, MyContent, Job, Course, Contact])