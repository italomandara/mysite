from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Person(models.Model):
    person_name = models.CharField(max_length=200)
    person_lastname = models.CharField(max_length=200)
    person_role = models.CharField(max_length=200)
    person_birthday = models.DateTimeField('Birthday')


class Skill(models.Model):
	PRINT = 'PR'
	DESIGN = 'DS'
	CODING = 'CO'
	HUMAN = 'HU'
	SKILL_TYPES = (
        (PRINT , 'Print'),
        (DESIGN , 'Design'),
        (CODING , 'Coding'),
        (HUMAN , 'Human')
    )
	skill_type = models.CharField(
    	max_length = 2,
    	choices = SKILL_TYPES,
    	default = CODING,
    )
	skill_name = models.CharField(max_length=200)
	skill_description = models.CharField(max_length=200)
	skill_icon = models.CharField(max_length=200)
	skill_rating = models.IntegerField(default=0)
	skill_category = models.CharField(max_length=200)

	def get_skill_type(self):
		return self.skill_type