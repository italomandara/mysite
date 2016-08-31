from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader

from django.shortcuts import render
from .forms import ContactForm
from django.core.urlresolvers import resolve
from django.template.defaultfilters import slugify
from .models import Person, Skill, MyContent, Job, Course, Post

import json
import socket

# Create your views here.

def pageName(request):
	return resolve(request.path_info).url_name

def index(request):
	template = loader.get_template('home/index.html')
	person = Person.objects.get(name__iexact='italo')
	skills_list = Skill.objects.all()
	job_history = Job.objects.all().order_by('-end_date')
	education = Course.objects.all().order_by('-end_date')
	intro = MyContent.objects.get(slug='intro')
	achievements = MyContent.objects.get(slug='achievements')
	profile = MyContent.objects.get(slug='profile')
	form = ContactForm()
	skill_categories = Skill.TYPES
	skill_subcategories = Skill.objects.values_list('subcategory').distinct()
	hostname = socket.gethostname()
	context = {
		'hostname': hostname,
		'person': person,
		'skills_list': skills_list,
		'skill_categories': skill_categories,
		'skill_subcategories': skill_subcategories,
		'intro': intro,
		'job_history': job_history,
		'education': education,
		'achievements': achievements,
		'profile': profile,
		'form': form,
		'page' : {
			'title': 'home',
			'name': pageName(request),
			'description': intro.h1 + ', ' + intro.h2 ,
		},
    }

	return HttpResponse(template.render(context, request))

def more(request):
	template = loader.get_template('home/more.html')
	person = Person.objects.get(name__iexact='italo')
	education = Course.objects.all().order_by('-end_date')
	intro = MyContent.objects.get(slug='intro')
	skills = MyContent.objects.get(slug='skills')
	achievements = MyContent.objects.get(slug='achievements')
	profile = MyContent.objects.get(slug='profile')
	form = ContactForm()
	hostname = socket.gethostname()
	context = {
		'hostname': hostname,
		'person': person,
		'intro': intro,
		'skills': skills,
		'education': education,
		'achievements': achievements,
		'profile': profile,
		'form': form,
		'page' : {
			'title': 'home',
			'name': pageName(request),
			'description': intro.h1 + ', ' + intro.h2 ,
		},
    }

	return HttpResponse(template.render(context, request))

def thoughts(request):
	template = loader.get_template('thoughts/index.html')
	person = Person.objects.get(name__iexact='italo')
	intro = MyContent.objects.get(slug='thoughts-intro')
	posts = Post.objects.filter(published=True)
	post_categories = Post.CATEGORIES
	form = ContactForm()
	context = {
		'intro': intro,
		'posts': posts,
		'post_categories': post_categories,
		'person': person,
		'form': form,
		'page' : {
			'title': 'thoughts',
			'name': pageName(request),
			'description': intro.h1 + ', ' + intro.h2 ,
		},	
    }

	return HttpResponse(template.render(context, request))

def thoughtsDetail(request, slug):
	template = loader.get_template('thoughts/detail.html')
	person = Person.objects.get(name__iexact='italo')
	post = Post.objects.get(published=True, slug=slug)
	form = ContactForm()
	post_categories = Post.CATEGORIES
	context = {
		'post': post,
		'person': person,
		'post_categories': post_categories,
		'form': form,
		'page' : {
			'title': slug,
			'name': pageName(request),
			'description': post.subtitle,
		},	
    }

	return HttpResponse(template.render(context, request))

def thoughtsCategory(request, slug):
	
	def get_tuple_key_from_slug(source_tuple, source_slug):
		for key, value in dict(source_tuple).iteritems():
		    if slugify(value) == source_slug:
				return key

	current_category_key = get_tuple_key_from_slug(Post.CATEGORIES,slug)
	template = loader.get_template('thoughts/category.html')
	person = Person.objects.get(name__iexact='italo')
	intro = MyContent.objects.get(slug=slug)
	posts = Post.objects.filter(published=True, category=current_category_key)
	post_categories = Post.CATEGORIES
	form = ContactForm()
	context = {
		'posts': posts,
		'person': person,
		'post_categories': post_categories,
		'form': form,
		'intro': intro,
		'page' : {
			'title': slug,
			'name': pageName(request),
			'description': 'category',
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