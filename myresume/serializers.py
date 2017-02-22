from rest_framework import serializers
from .models import Person, Skill, MyContent, Job, Course, Post, Contact

# Serializers define the API representation.
class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('__all__')

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('__all__')

class MyContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyContent
        fields = ('__all__')

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('__all__')

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('__all__')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('__all__')

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('__all__')
