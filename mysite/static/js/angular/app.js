var app = angular.module("myResume", ['ngRoute', 'ngSanitize']);

$.fn.attr_safe = function(attribute) {
	return (typeof this.attr(attribute) !== typeof undefined || !this.attr(attribute)) ? this.attr(attribute) : 'undefined';
};

markdown = function(item) {
	var item_defined = typeof item !== typeof undefined;
	var item_is_string = typeof item === typeof "a";
	if (item_defined && item_is_string) {
		return marked(item);
	} else {
		return 'Error processing markdown content: input is not a string';
	}
};

app.filter('slugify', function() {
	return function(item) {
		var output_string = item
			.toLowerCase()
			.replace(/[^\w ]+/g, '')
			.replace(/ +/g, '-')
		return output_string;
	};
});

app.filter('markdown', function() {
	return function(item) {
		var output_string = markdown(item)
		return output_string;
	};
});

// def resize(value, arg):
// 	return "https://process.filestackapi.com/" + settings.FILEPICKER_API_KEY + "/resize=" + arg + "/" + value

// def effect(value, arg):
// 	return "https://process.filestackapi.com/" + settings.FILEPICKER_API_KEY + "/" + arg + "/" + value

app.filter('effect', function() {
	return function(item) {
		var output_string = item
		return output_string;
	};
});

app.filter('resize', function() {
	return function(item) {
		var output_string = item
		return output_string;
	};
});

app.config(['$locationProvider', '$routeProvider',
	function config($locationProvider, $routeProvider) {
		// $locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('');
		$routeProvider
			.when('/', {
				templateUrl: DJ.static('js/angular/templates/home.html'),
				controller: 'homeController'
			})
			.when('/more', {
				templateUrl: DJ.static('js/angular/templates/more.html'),
				controller: 'moreController'
			})
			.when('/thoughts', {
				templateUrl: DJ.static('js/angular/templates/thoughts/index.html'),
				controller: 'thoughtsController'
			})
	}
])

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

app.run(function($timeout, $rootScope) {
	$rootScope.$on('$viewContentLoaded', function() {
		$timeout(function() {
			$(document).foundation();
		}, 500);
	});

	$rootScope.markdown = function(item) {
		return markdown(item);
	};
});