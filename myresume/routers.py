from .viewsets import *
from rest_framework import routers

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'person', PersonViewSet)
router.register(r'skill', SkillViewSet)
router.register(r'mycontent', MyContentViewSet)
router.register(r'job', JobViewSet)
router.register(r'course', CourseViewSet)
router.register(r'post', PostViewSet)
router.register(r'contact', ContactViewSet)
