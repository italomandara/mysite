from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'icons/', views.icons, name='icons'),
    url(r'contact-form/', views.ajaxContactForm, name='contact-form'),
    url(r'thoughts/', views.thoughts, name='thoughts'),
]