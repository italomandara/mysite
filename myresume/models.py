from __future__ import unicode_literals

from django.db import models
from django.core.validators import validate_email, RegexValidator
from django.template.defaultfilters import slugify

import datetime
import django_filepicker

class Person(models.Model):
    name = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    birthday = models.DateTimeField('Birthday')
    available = models.BooleanField(default=True)
    unavailable_msg = models.TextField(max_length=1000, blank=True)
    unavailable_msg_it = models.TextField(max_length=1000, blank=True)

    def __unicode__(self):
		return self.name
    

class Skill(models.Model):
	PRINT = 'PR'
	DESIGN = 'DS'
	CODING = 'CO'
	HUMAN = 'HU'
	TYPES = (
        (PRINT , 'Print'),
        (DESIGN , 'Design'),
        (CODING , 'Coding'),
        (HUMAN , 'Human')
    )
	category = models.CharField(
    	max_length = 2,
    	choices = TYPES,
    	default = CODING,
    )
	name = models.CharField(max_length=255)
	description = models.TextField(max_length=5000)
	description_it = models.TextField(max_length=5000)
	icon = models.CharField(max_length=255)
	rating = models.IntegerField(default=0)
	subcategory = models.CharField(max_length=255)

	def get_skill_category(self):
		return dict(self.TYPES)[self.category]

	def get_categories(self):
		return self.TYPES

	def get_subcategories(self):
		return self.objects.values_list('subcategory').distinct()

	def __unicode__(self):
		return self.name

class MyContent(models.Model):
	slug = models.SlugField(max_length=255, primary_key=True)
	image_primary = models.CharField(max_length=255, blank=True)
	image_secondary = models.CharField(max_length=255, blank=True)
 	h1 = models.CharField(max_length=255, blank=True)
	h2 = models.CharField(max_length=255, blank=True)
	body = models.TextField(max_length=5000)
	h1_it = models.CharField(max_length=255, blank=True)
	h2_it = models.CharField(max_length=255, blank=True)
	body_it = models.TextField(max_length=5000)
	layout_class = models.CharField(max_length=255, blank=True)

	def __unicode__(self):
		return self.slug

class Job(models.Model):
	PRINT = 'PR'
	DESIGN = 'DS'
	CODING = 'CO'
	OTHER = 'OT'
	TYPES = (
        (PRINT , 'Print'),
        (DESIGN , 'Design'),
        (CODING , 'Coding'),
        (OTHER , 'Human')
    )
	category = models.CharField(
    	max_length = 2,
    	choices = TYPES,
    	default = CODING,
    )
	name = models.CharField(max_length=255, blank=True)
	excerpt = models.CharField(max_length=255, blank=True)
	company = models.CharField(max_length=255, blank=True)
	name_it = models.CharField(max_length=255, blank=True)
	excerpt_it = models.CharField(max_length=255, blank=True)
	description = models.TextField(max_length=5000)
	description_it = models.TextField(max_length=5000)
	
	location = models.CharField(max_length=255, blank=True)
	layout_class = models.CharField(max_length=255, blank=True)

	start_date = models.DateField('Start Date')
	end_date = models.DateField('End Date')

	def get_job_category(self):
		return dict(self.TYPES)[self.category]

	def __unicode__(self):
		return self.name


class Course(models.Model):
	PRINT = 'PR'
	DESIGN = 'DS'
	CODING = 'CO'
	HUMAN = 'HU'
	SCHOOL = 'SC'
	TYPES = (
        (PRINT , 'Print'),
        (DESIGN , 'Design'),
        (CODING , 'Coding'),
        (HUMAN , 'Human'),
        (SCHOOL , 'School')
    )
	category = models.CharField(
    	max_length = 2,
    	choices = TYPES,
    	default = SCHOOL,
    )
	title = models.CharField(max_length=255, blank=True)
	title_it = models.CharField(max_length=255, blank=True)
	description = models.TextField(max_length=5000)
	description_it = models.TextField(max_length=5000)
	
	location = models.CharField(max_length=255, blank=True)
	layout_class = models.CharField(max_length=255, blank=True)

	start_date = models.DateField('Start Date')
	end_date = models.DateField('End Date')

	def get_course_category(self):
		return dict(self.TYPES)[self.category]

	def __unicode__(self):
		return self.title


class Contact(models.Model):
	phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
	name = models.CharField(max_length=100)
	company = models.CharField(max_length=100, blank=True)
	phone = models.CharField(max_length=15, validators=[phone_regex], blank=True)
	email = models.CharField(max_length=100, validators=[validate_email])
	message = models.CharField(max_length=1000)

	def __unicode__(self):
		return self.name


class Post(models.Model):
	slug = models.SlugField(max_length=255, primary_key=True)
	title = models.CharField(max_length=100)
	subtitle = models.CharField(max_length=255)
	author = models.CharField(max_length=100, blank=True)
	TECH = 'TC'
	LIFE = 'LF'
	COURSES = 'CS'
	CODING = 'CD'
	CATEGORIES = (
		(TECH, 'Technology'),
		(LIFE, 'Life'),
		(COURSES, 'Courses'),
		(CODING,'Coding'),
	)
	category = models.CharField(
    	max_length = 2,
    	choices = CATEGORIES,
    	default = LIFE,
    )
	featured_image = django_filepicker.models.FPUrlField()
	article_image1 = django_filepicker.models.FPUrlField(blank=True)
	article_image2 = django_filepicker.models.FPUrlField(blank=True)
	published = models.BooleanField(default=False)
	created_at = models.DateField(auto_now_add=True)
	updated_at = models.DateField(auto_now=True) 
	tag = models.CharField(max_length=50)
	body = models.TextField(max_length=5000)

	def get_category(self):
		return dict(self.CATEGORIES)[self.category]

	def get_tag(self):
		return self.objects.values_list('tag').distinct()

	def __unicode__(self):
		return self.title

