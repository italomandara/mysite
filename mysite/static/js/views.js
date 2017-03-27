var env = nunjucks.configure('/static/js/jinja_templates/', {
	autoescape: true
});
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
		return url;
	}
}
env.addExtension('static', new Static());
env.addExtension('trans', new Trans());
env.addExtension('url', new DjUrl());
env.addFilter('date', function(str, type) {
    return str;
});

var indexView = function(template, context) {

	var template = 'home/ind.html';
	var context = {
		hostname: window.location.hostname
	};

	var settings = $.ajax({
		cache: false,
		method: 'get',
		url: '/api/s/',
	});

	var person = $.ajax({
		cache: false,
		method: 'get',
		url: '/api/person/?name=Italo&format=json',
	});

	var categories = $.ajax({
		cache: false,
		method: 'get',
		url: '/api/categories/?format=json',
	});

	var skill = $.ajax({
		cache: false,
		method: 'get',
		url: '/api/skill/?format=json',
	});

	var intro = $.ajax({
		cache: false,
		method: 'get',
		url: '/api/mycontent/?slug=intro&format=json',
	});

	var achievements = $.ajax({
		cache: false,
		method: 'get',
		url: '/api/mycontent/?slug=achievements&format=json',
	});

	var profile = $.ajax({
		cache: false,
		method: 'get',
		url: '/api/mycontent/?slug=profile&format=json',
	});

	var job = $.ajax({
		cache: false,
		method: 'get',
		url: '/api/job/?format=json',
	});

	var education = $.ajax({
		cache: false,
		method: 'get',
		url: '/api/course/?format=json',
	});

	var contact = $.ajax({
		cache: false,
		method: 'options',
		url: '/api/contact/?format=json',
	});

	$.when(settings, person, categories, skill, intro, job, education, contact)
		.then(function(settings, person, categories, skill, intro, job, education, contact) {
			$.extend(context, {
				settings: settings[0],
				person: person[0],
				categories: categories[0],
				skillslist: skill[0],
				skillcategories: categories[0].skill,
				skillsubcategories: [],
				intro: intro[0],
				postcategories: categories[0].post,
				jobhistory: job[0],
				education: education[0],
				form: contact[0].actions.POST,
			});
			$('body').append(nunjucks.render(template, context));
		})
	return nunjucks.render(template, context);
}

indexView();