var Categories = {
	skill: {
		'PR': 'Print',
		'DS': 'Design',
		'CO': 'Coding',
		'HU': 'Human',
	},
	job: {
		'PR': 'Print',
		'DS': 'Design',
		'CO': 'Coding',
		'OT': 'Human'
	},
	post: {
		'TC': 'Technology',
		'LF': 'Life',
		'CS': 'Courses',
		'CD': 'Coding',
	},
	course: {
		'PR': 'Print',
		'DS': 'Design',
		'CO': 'Coding',
		'HU': 'Human',
		'SC': 'School'
	}
},
active_navigation_class = 'active';

$.fn.attr_safe = function(attribute) {
	return (typeof this.attr(attribute) !== typeof undefined || !this.attr(attribute)) ? this.attr(attribute) : 'undefined';
};
var markdown = function(item) {
	var item_defined = typeof item !== typeof undefined;
	var item_is_string = typeof item === typeof "a";
	if (item_defined && item_is_string) {
		return marked(item);
	} else {
		return '';
	}
},
getCategoryIdFromSlug = function( obj, value ) {
    for( var prop in obj ) {
        if( obj.hasOwnProperty( prop ) ) {
             if( slugify(obj[ prop ]) === value )
                 return prop;
        }
    }
},
slugify = function(item) {
	var output_string = item
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-')
	return output_string;
},
app = angular.module('myResume', ['ngRoute', 'ngSanitize']);

app.factory('navUpdate', ['$rootScope', '$location', '$http', function($rootScope, $location, $http){
	return function(obj) {
		var h1 = obj.intro.h1 || obj.intro.title,
		h2 = obj.intro.h2 || obj.intro.subtitle,
		hero_image = obj.intro.image_primary || obj.intro.featured_image;
		$rootScope.nav = $rootScope.nav || {};
		$rootScope.nav = obj;
		$rootScope.nav.post_categories = Categories.post;
		$rootScope.nav.hero_title = h1;
		$rootScope.nav.hero_subtitle = h2;
		$rootScope.nav.hero_image = hero_image;
		$rootScope.nav.page.description = h1 + ', ' + h2;
		if(!$rootScope.nav.person){
			$http.get([$location.origin, '/api/person/', '?name=Italo&format=json'].join('')).then(function(person) {
				$rootScope.nav.person = person.data[0];
				$rootScope.nav.title = [$rootScope.nav.person.name, $rootScope.nav.person.lastname, "'s resume"].join('');
			});
		}
	}
}])

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