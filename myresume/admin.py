from django.contrib import admin
from django.db import models

from .models import Person, Skill, MyContent, Job, Course, Contact, Post
from django_filepicker.forms import FPFileField
from django_filepicker.widgets import FPFileWidget

from django import forms

class PostAdminForm(forms.ModelForm):
	class Meta:
		model = Post
		fields = '__all__'
		widgets = {
			'featured_image': FPFileWidget(attrs={'type':'filepicker'}),
			'article_image1': FPFileWidget(attrs={'type':'filepicker'}),
			'article_image2': FPFileWidget(attrs={'type':'filepicker'}),
		}

class PostAdmin(admin.ModelAdmin):
    form = PostAdminForm

    class Media:
        js = (["//api.filepicker.io/v1/filepicker.js"])


class MyContentAdminForm(forms.ModelForm):
	class Meta:
		model = MyContent
		fields = '__all__'
		widgets = {
			'video_primary': FPFileWidget(attrs={'type':'filepicker'}),
			'image_primary': FPFileWidget(attrs={'type':'filepicker'}),
			'image_secondary': FPFileWidget(attrs={'type':'filepicker'}),
		}

class MyContentAdmin(admin.ModelAdmin):
    form = MyContentAdminForm

    class Media:
        js = (["//api.filepicker.io/v1/filepicker.js"])


admin.site.register([Person, Skill, Job, Course, Contact])
admin.site.register(Post, PostAdmin)
admin.site.register(MyContent, MyContentAdmin)
