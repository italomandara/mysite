import django_filters.rest_framework

from rest_framework import viewsets, filters, mixins
from .models import Person, Skill, MyContent, Job, Course, Post, Contact
from .serializers import PersonSerializer, SkillSerializer, MyContentSerializer, JobSerializer, CourseSerializer, PostSerializer, ContactSerializer
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
	filter_fields = ('__all__')
	filter_backends = (filters.OrderingFilter, django_filters.rest_framework.DjangoFilterBackend)
	ordering_fields = ('__all__')

class ContactViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
	queryset = Contact.objects.all()
	serializer_class = ContactSerializer
	http_method_names = ['post', 'options']
	permissions_classes = (IsOwnerOrReadOnly,)
