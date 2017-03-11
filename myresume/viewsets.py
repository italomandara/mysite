import django_filters.rest_framework

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets, filters, mixins
from .models import Person, Skill, MyContent, Job, Course, Post, Contact
from .serializers import PersonSerializer, SkillSerializer, MyContentSerializer, JobSerializer, CourseSerializer, PostSerializer, ContactSerializer
from .permissions import IsOwnerOrReadOnly

# ViewSets define the view behavior.

class PersonViewSet(viewsets.ModelViewSet):
	http_method_names = ['get']
	queryset = Person.objects.all()
	serializer_class = PersonSerializer
	permissions_classes = (IsOwnerOrReadOnly,)
	filter_fields = ('__all__')

class SkillViewSet(viewsets.ModelViewSet):
	http_method_names = ['get']
	queryset = Skill.objects.all()
	serializer_class = SkillSerializer
	permissions_classes = (IsOwnerOrReadOnly,)
	filter_fields = ('__all__')

class MyContentViewSet(viewsets.ModelViewSet):
	http_method_names = ['get']
	queryset = MyContent.objects.all()
	serializer_class = MyContentSerializer
	permissions_classes = (IsOwnerOrReadOnly,)
	filter_fields = ('__all__')

class JobViewSet(viewsets.ModelViewSet):
	http_method_names = ['get']
	queryset = Job.objects.all()
	serializer_class = JobSerializer
	permissions_classes = (IsOwnerOrReadOnly,)
	filter_fields = ('__all__')

class CourseViewSet(viewsets.ModelViewSet):
	http_method_names = ['get']
	queryset = Course.objects.all()
	serializer_class = CourseSerializer
	permissions_classes = (IsOwnerOrReadOnly,)
	filter_fields = ('__all__')

class PostViewSet(viewsets.ModelViewSet):
	http_method_names = ['get']
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

class SkillCategoryViewSet(APIView):

	def get(self, request, *args, **kw):
		myClass = Skill(*args, **kw)
		result = myClass.get_categories()
		response = Response(result, status=status.HTTP_200_OK)
		return response

class JobCategoryViewSet(APIView):

	def get(self, request, *args, **kw):
		myClass = Job(*args, **kw)
		result = myClass.get_categories()
		response = Response(result, status=status.HTTP_200_OK)
		return response

class CourseCategoryViewSet(APIView):

	def get(self, request, *args, **kw):
		myClass = Course(*args, **kw)
		result = myClass.get_categories()
		response = Response(result, status=status.HTTP_200_OK)
		return response

class PostCategoryViewSet(APIView):

	def get(self, request, *args, **kw):
		myClass = Post(*args, **kw)
		result = myClass.get_categories()
		response = Response(result, status=status.HTTP_200_OK)
		return response

class AllCategoryViewSet(APIView):

	def get(self, request, *args, **kw):
		skillCategories = Skill(*args, **kw)
		jobCategories = Job(*args, **kw)
		courseCategories = Course(*args, **kw)
		postCategories = Post(*args, **kw)
		result = {
			'skill': skillCategories.get_categories(),
			'job': jobCategories.get_categories(),
			'course': courseCategories.get_categories(),
			'post': postCategories.get_categories()
		}
		response = Response(result, status=status.HTTP_200_OK)
		return response
