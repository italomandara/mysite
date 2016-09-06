from django.forms import ModelForm, TextInput, Textarea
from captcha.fields import CaptchaField

from .models import Contact

class ContactForm(ModelForm):
	captcha = CaptchaField()
	class Meta:
		model = Contact
		fields = ['name', 'company', 'phone', 'email', 'message', 'captcha']
		
		widgets = {
			'name' : TextInput(attrs={'required': True}),
			'company' : TextInput(),
			'phone' : TextInput(attrs={'pattern': 'number'}),
			'email' : TextInput(attrs={'pattern': 'email','required': True}),
			'message' : Textarea(attrs={'rows': 5, 'required': True}),
		}