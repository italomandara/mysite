from django.conf.urls import include, url
from . import views
from .routers import *

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'more$', views.more, name='more'),
    url(r'icons$', views.icons, name='icons'),
    url(r'contact-form$', views.ajaxContactForm, name='contact-form'),
    url(r'thoughts/$', views.thoughts, name='thoughts'),
    url(r'thoughts/posts/(?P<slug>[\w-]+)/$', views.thoughtsDetail, name='thoughts-detail'),
    url(r'thoughts/categories/(?P<slug>[\w-]+)/$', views.thoughtsCategory, name='thoughts-category'),
]

urlpatterns += [
    url(r'ng$', views.index_ng, name='index_ng'),
    # url(r'api/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'api/', include(router.urls), name='api')
]