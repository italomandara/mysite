nunjucks.installJinjaCompat();
var env = nunjucks.configure('/static/js/jinja_templates/', {
	autoescape: true
});
var bootstrap = function(){};
window.viewready = function() {};

function Static() {
	this.tags = ['static'];
	this.parse = function(parser, nodes, lexer) {
		// get the tag token
		var tok = parser.nextToken();

		// parse the args and move after the block end. passing true
		// as the second arg is required if there are no parentheses
		var args = parser.parseSignature(null, true);
		parser.advanceAfterBlockEnd(tok.value);

		// parse the body and possibly the error block, which is optional
		var body = parser.parseUntilBlocks('error', 'endremote');
		var errorBody = null;

		if (parser.skipSymbol('error')) {
			parser.skip(lexer.TOKEN_BLOCK_END);
			errorBody = parser.parseUntilBlocks('endremote');
		}

		parser.advanceAfterBlockEnd();

		// See above for notes about CallExtension
		return new nodes.CallExtension(this, 'run', args, [body, errorBody]);
	};
	this.run = function(context, url, body, errorBody) {
		return '/static/' + url;
	}
}

function DjUrl() {
	this.tags = ['url'];
	this.parse = function(parser, nodes, lexer) {
		// get the tag token
		var tok = parser.nextToken();

		// parse the args and move after the block end. passing true
		// as the second arg is required if there are no parentheses
		var args = parser.parseSignature(null, true);
		parser.advanceAfterBlockEnd(tok.value);

		// parse the body and possibly the error block, which is optional
		var body = parser.parseUntilBlocks('error', 'endremote');
		var errorBody = null;

		if (parser.skipSymbol('error')) {
			parser.skip(lexer.TOKEN_BLOCK_END);
			errorBody = parser.parseUntilBlocks('endremote');
		}

		parser.advanceAfterBlockEnd();

		// See above for notes about CallExtension
		return new nodes.CallExtension(this, 'run', args, [body, errorBody]);
	};
	this.run = function(context, url, body, errorBody) {
		return '#' + url;
	}
}

function Trans() {
	this.tags = ['trans'];
	this.parse = function(parser, nodes, lexer) {
		// get the tag token
		var tok = parser.nextToken();

		// parse the args and move after the block end. passing true
		// as the second arg is required if there are no parentheses
		var args = parser.parseSignature(null, true);
		parser.advanceAfterBlockEnd(tok.value);

		// See above for notes about CallExtension
		return new nodes.CallExtension(this, 'run', args);
	};
	this.run = function(context, argument, body, errorBody) {
		return argument;
	}
}

function Load() {
	this.tags = ['load'];
	this.parse = function(parser, nodes, lexer) {
		// get the tag token
		var tok = parser.nextToken();

		// parse the args and move after the block end. passing true
		// as the second arg is required if there are no parentheses
		var args = parser.parseSignature(null, true);
		parser.advanceAfterBlockEnd(tok.value);

		// See above for notes about CallExtension
		return new nodes.CallExtension(this, 'run', args);
	};
	this.run = function(context, argument, body, errorBody) {
		console.log(argument)
		return '';
	}
}

env.addExtension('static', new Static());
env.addExtension('trans', new Trans());
env.addExtension('url', new DjUrl());
env.addFilter('date', function(str, type) {
    return str;
});
env.addFilter('slugify', function(str) {
    return str;
});

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