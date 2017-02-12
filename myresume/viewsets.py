import django_filters.rest_framework

from rest_framework import viewsets,generics
from .models import Person, Skill, MyContent, Job, Course, Post
from .serializers import PersonSerializer, SkillSerializer, MyContentSerializer, JobSerializer, CourseSerializer, PostSerializer
from .permissions import IsOwnerOrReadOnly

# ViewSets define the view behavior.

class PersonViewSet(viewsets.ModelViewSet):
	queryset = Person.objects.all()
	serializer_class = PersonSerializer
	permissions_classes = (IsOwnerOrReadOnly,)
	filter_fields = ('__all__')

class SkillViewSet(viewsets.ModelViewSet):
	queryset = Skill.objects.all()
	serializer_class = SkillSerializer
	permissions_classes = (IsOwnerOrReadOnly,)
	filter_fields = ('__all__')

class MyContentViewSet(viewsets.ModelViewSet):
	queryset = MyContent.objects.all()
	serializer_class = MyContentSerializer
	permissions_classes = (IsOwnerOrReadOnly,)
	filter_fields = ('__all__')

class JobViewSet(viewsets.ModelViewSet):
	queryset = Job.objects.all()
	serializer_class = JobSerializer
	permissions_classes = (IsOwnerOrReadOnly,)
	filter_fields = ('__all__')

class CourseViewSet(viewsets.ModelViewSet):
	queryset = Course.objects.all()
	serializer_class = CourseSerializer
	permissions_classes = (IsOwnerOrReadOnly,)
	filter_fields = ('__all__')

class PostViewSet(viewsets.ModelViewSet):
	queryset = Post.objects.all()
	serializer_class = PostSerializer
	permissions_classes = (IsOwnerOrReadOnly,)
	filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
