from django.forms import ModelForm, TextInput, Textarea
from .models import Contact

class ContactForm(ModelForm):
	class Meta:
		model = Contact
		fields = ['name', 'company', 'phone', 'email', 'message']
		widgets = {
			'name' : TextInput(attrs={'required': True}),
			'company' : TextInput(),
			'phone' : TextInput(attrs={'pattern': 'number'}),
			'email' : TextInput(attrs={'pattern': 'email','required': True}),
			'message' : Textarea(attrs={'rows': 5, 'required': True}),
		}