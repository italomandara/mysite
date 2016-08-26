from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'more$', views.more, name='more'),
    url(r'icons$', views.icons, name='icons'),
    url(r'contact-form$', views.ajaxContactForm, name='contact-form'),
    url(r'thoughts/$', views.thoughts, name='thoughts'),
    url(r'thoughts/posts/(?P<slug>[\w-]+)/$', views.thoughtsDetail, name='thoughts-detail'),
    url(r'thoughts/categories/(?P<slug>[\w-]+)/$', views.thoughtsCategory, name='thoughts-category'),
]