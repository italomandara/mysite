from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Person(models.Model):
    name = models.CharField(max_length=200)
    lastname = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
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
	name = models.CharField(max_length=200)
	description = models.TextField(max_length=5000)
	icon = models.CharField(max_length=200)
	rating = models.IntegerField(default=0)
	subcategory = models.CharField(max_length=200)

	def get_skill_category(self):
		return dict(self.TYPES)[self.category]