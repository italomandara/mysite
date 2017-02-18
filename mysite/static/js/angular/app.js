markdown = function(item) {
	var item_defined = typeof item !== typeof undefined;
	var item_is_string = typeof item === typeof "a";
	if (item_defined && item_is_string) {
		return marked(item);
	} else {
		return '';
	}
};

var getCategoryIdFromSlug = function( obj, value ) {
    for( var prop in obj ) {
        if( obj.hasOwnProperty( prop ) ) {
             if( slugify(obj[ prop ]) === value )
                 return prop;
        }
    }
};

var slugify = function(item) {
	var output_string = item
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-')
	return output_string;
};

var app = angular.module("myResume", ['ngRoute', 'ngSanitize']);

$.fn.attr_safe = function(attribute) {
	return (typeof this.attr(attribute) !== typeof undefined || !this.attr(attribute)) ? this.attr(attribute) : 'undefined';
};

app.filter('slugify', function() {
	return function(item) {	
		return slugify(item);
	};
});

app.filter('markdown', function() {
	return function(item) {
		var output_string = markdown(item)
		return output_string;
	};
});

app.filter('effect', function() {
	return function(value, arg) {
		var output_string = "https://process.filestackapi.com/" + settings.FILEPICKER_API_KEY + "/" + arg + "/" + value
		return !!value && !!arg ? output_string: '';
	};
});

app.filter('resize', function() {
	return function(value, arg) {
		var output_string = "https://process.filestackapi.com/" + settings.FILEPICKER_API_KEY + "/resize=" + arg + "/" + value
		return !!value && !!arg ? output_string: '';
	};
});

app.config(['$locationProvider', '$routeProvider',
	function config($locationProvider, $routeProvider) {
		// $locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('');
		// $locationProvider.html5Mode(true);
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
			.when('/thoughts/categories/:category', {
				templateUrl: DJ.static('js/angular/templates/thoughts/category.html'),
				controller: 'postCategoriesController'
			})
			.when('/thoughts/posts/:slug', {
				templateUrl: DJ.static('js/angular/templates/thoughts/post.html'),
				controller: 'postController'
			})
			.when('/404', {
				templateUrl: DJ.static('js/angular/templates/404.html'),
				controller: 'homeController'
			})
			.otherwise({redirectTo:'/404'});
	}
])

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

app.run(function($timeout, $rootScope) {
	$rootScope.$on('$viewContentLoaded', function() {
		$timeout(function() {
			$(document).foundation()
				.on('click', 'a[href].active', function(e) {
					e.preventDefault();
				});
			$('.js-lazy').lazyload();
		}, 500);
	});

	$rootScope.markdown = function(item) {
		return markdown(item);
	};
});