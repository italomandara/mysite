from django import template
from django.conf import settings
register = template.Library()

def resize(value, arg):
	return "https://process.filestackapi.com/" + settings.FILEPICKER_API_KEY + "/resize=" + arg + "/" + value

def effect(value, arg):
	return "https://process.filestackapi.com/" + settings.FILEPICKER_API_KEY + "/" + arg + "/" + value

register.filter('resize', resize)
register.filter('effect', effect)
