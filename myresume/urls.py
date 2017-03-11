from django.conf.urls import include, url
from . import views, viewsets
from .routers import *

urlpatterns = [
    # url(r'^$', views.index, name='index'),
    # url(r'more$', views.more, name='more'),
    # url(r'icons$', views.icons, name='icons'),
    # url(r'contact-form$', views.ajaxContactForm, name='contact-form'),
    # url(r'thoughts/$', views.thoughts, name='thoughts'),
    # url(r'thoughts/posts/(?P<slug>[\w-]+)/$', views.thoughtsDetail, name='thoughts-detail'),
    # url(r'thoughts/categories/(?P<slug>[\w-]+)/$', views.thoughtsCategory, name='thoughts-category'),
]

urlpatterns += [
    url(r'^$', views.index_ng, name='index_ng'),
    # url(r'api/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'api/', include(router.urls), name='api'),
    url(r'api/categories/', AllCategoryViewSet.as_view(), name='all_categories'),
    url(r'api/categories/job', JobCategoryViewSet.as_view(), name='job_categories'),
    url(r'api/categories/course', CourseCategoryViewSet.as_view(), name='course_categories'),
    url(r'api/categories/post', PostCategoryViewSet.as_view(), name='post_categories'),
    url(r'api/categories/post', PostCategoryViewSet.as_view(), name='post_categories'),
]