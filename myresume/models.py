from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Person(models.Model):
    name = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    birthday = models.DateTimeField('Birthday')
    
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
	icon = models.CharField(max_length=255)
	rating = models.IntegerField(default=0)
	subcategory = models.CharField(max_length=255)

	def get_skill_category(self):
		return dict(self.TYPES)[self.category]

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
