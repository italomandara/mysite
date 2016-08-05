from django.http import HttpResponse
from django.template import loader

# Create your views here.

from .models import Person, Skill, MyContent

def index(request):
	person = Person.objects.get(name__iexact='italo')
	skills_list = Skill.objects.all()
	intro = MyContent.objects.get(slug='intro')
	template = loader.get_template('main.html')
	context = {
		'person': person,
		'skills_list': skills_list,
		'intro': intro
    }
	return HttpResponse(template.render(context, request))