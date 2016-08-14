from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader

from django.shortcuts import render
from .forms import ContactForm
import json

# Create your views here.

from .models import Person, Skill, MyContent, Job, Course

def index(request):
	person = Person.objects.get(name__iexact='italo')
	skills_list = Skill.objects.all()
	job_history = Job.objects.all().order_by('-end_date')
	education = Course.objects.all().order_by('-end_date')
	intro = MyContent.objects.get(slug='intro')
	achievements = MyContent.objects.get(slug='achievements')
	profile = MyContent.objects.get(slug='profile')
	skills = MyContent.objects.get(slug='skills')
	template = loader.get_template('home/index.html')
	form = ContactForm()
	skill_categories = Skill.TYPES
	skill_subcategories = Skill.objects.values_list('subcategory').distinct()
	context = {
		'person': person,
		'skills_list': skills_list,
		'skill_categories': skill_categories,
		'skill_subcategories': skill_subcategories,
		'intro': intro,
		'job_history': job_history,
		'education': education,
		'achievements': achievements,
		'profile': profile,
		'skills': skills,
		'form': form,
		'page' : {
			'title': 'home',
			'description': intro.h1 + ', ' + intro.h2 ,
		},
    }

	return HttpResponse(template.render(context, request))

def contactForm(request):
	form = ContactForm(request.POST)

	if request.method == 'POST':
		
		if form.is_valid():
			form.save()

	return HttpResponseRedirect('/')

def ajaxContactForm(request):
	form = ContactForm(request.POST)

	if request.method == 'POST':

		if form.is_valid():
			form.save()

			return HttpResponse(
				json.dumps({"stored": 1}),
				content_type="application/json"
			)

		else:
			form_errors = json.loads(form.errors.as_json())

			return HttpResponse(
				json.dumps({"stored": 0, "error": 0, "form_errors" : form_errors}),
				content_type="application/json"
			)

	else:
		return HttpResponse(
			json.dumps({"stored": 0, "error": 1}),
			content_type="application/json"
		)

def icons(request):

	template = loader.get_template('icons.html')
	person = Person.objects.get(name__iexact='italo')
	context = { 
			'person': person,
		}

	return HttpResponse(template.render(context, request))