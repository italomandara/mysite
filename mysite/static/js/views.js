var indexView = function(template, context) {

	var template = 'home/ind.html';
	var context = {};

	var settings = $.ajax({
		method: 'get',
		url: '/api/s/',
	});

	var person = $.ajax({
		method: 'get',
		url: '/api/person/?name=Italo&format=json',
	});

	var categories = $.ajax({
		method: 'get',
		url: '/api/categories/?format=json',
	});

	var skill = $.ajax({
		method: 'get',
		url: '/api/skill/?format=json',
	});

	var intro = $.ajax({
		method: 'get',
		url: '/api/mycontent/?slug=intro&format=json',
	});

	var achievements = $.ajax({
		method: 'get',
		url: '/api/mycontent/?slug=achievements&format=json',
	});

	var profile = $.ajax({
		method: 'get',
		url: '/api/mycontent/?slug=profile&format=json',
	});

	var job = $.ajax({
		method: 'get',
		url: '/api/job/?format=json',
	});

	var education = $.ajax({
		method: 'get',
		url: '/api/course/?format=json',
	});

	var contact = $.ajax({
		method: 'options',
		url: '/api/contact/?format=json',
	});

	bootstrap = function(err,res){
		return function(){$(document).foundation;}
		console.log(window.ct = context);
	};

	$.when(settings, person, categories, skill, intro, job, education, contact)
		.then(function(settings, person, categories, skill, intro, job, education, contact) {
			var skillcategories = [], postcategories = [];
			for (var idx in categories[0].skill) {
				skillcategories.push({slug: idx, name: categories[0].skill[idx]})
			}
			for (var idx in categories[0].post) {
				postcategories.push({slug: idx, name: categories[0].post[idx]})
			}
			var getSkillCategory = function(slug){
				return categories[0].skill[slug];
			};
			var getJobCategory = function(slug){
				return categories[0].job[slug];
			};
			$.extend(context, {
				hostname: window.location.hostname,
				settings: settings[0],
				person: person[0][0],
				categories: categories[0],
				skillslist: skill[0],
				skillcategories: skillcategories,
				getSkillCategory: getSkillCategory,
				getJobCategory: getJobCategory,
				skillsubcategories: [{name: 'test1'}, {name: 'test2'}],
				intro: intro[0][0],
				postcategories: postcategories,
				jobhistory: job[0],
				education: education[0],
				form: contact[0].actions.POST,
			});
			$('body').append(nunjucks.render(template, context));
			$(document).foundation();
		})
	return true;
}

indexView();