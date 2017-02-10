from rest_framework import serializers
from .models import Person, Skill, MyContent, Job, Course, Post

# Serializers define the API representation.
class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ('__all__')

class SkillSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Skill
        fields = ('__all__')

class MyContentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MyContent
        fields = ('__all__')

class JobSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Job
        fields = ('__all__')

class CourseSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Course
        fields = ('__all__')

class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ('__all__')