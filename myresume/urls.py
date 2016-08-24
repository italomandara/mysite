from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'more$', views.more, name='more'),
    url(r'icons$', views.icons, name='icons'),
    url(r'contact-form$', views.ajaxContactForm, name='contact-form'),
    url(r'thoughts$', views.thoughts, name='thoughts'),
    url(r'thoughts/(?P<slug>[\w-]+)/$', views.thoughtsDetail, name='thoughts-detail'),
]