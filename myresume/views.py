from django.http import HttpResponse
from django.template import loader

# Create your views here.

from .models import Person, Skill, MyContent, Job, Course

def index(request):
	person = Person.objects.get(name__iexact='italo')
	skills_list = Skill.objects.all()
	job_history = Job.objects.all().order_by('-end_date')
	education = Course.objects.all().order_by('-end_date')
	intro = MyContent.objects.get(slug='intro')
	template = loader.get_template('home/index.html')
	context = {
		'person': person,
		'skills_list': skills_list,
		'intro': intro,
		'job_history': job_history,
		'education': education,
    }
	return HttpResponse(template.render(context, request))