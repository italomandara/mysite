from django.http import HttpResponse
from django.template import loader

# Create your views here.

from .models import Person, Skill

def index(request):
	persons_list = Person.objects.all()
	skills_list = Skill.objects.all()
	template = loader.get_template('main.html')
	context = {
		'persons_list': persons_list,
		'skills_list': skills_list,
    }
	return HttpResponse(template.render(context, request))