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


app = angular.module('myResume', ['ngRoute', 'ngSanitize', 'mm.foundation', 'ngTouch', 'ngAnimate']);

app.factory('markdown', function() {
	return function(item) {
		var item_defined = typeof item !== typeof undefined;
		var item_is_string = typeof item === typeof "a";
		if (item_defined && item_is_string) {
			return marked(item);
		} else {
			return '';
		}
	}
});

app.factory('slugify', function() {
	return function(item) {
		var output_string = item
			.toLowerCase()
			.replace(/[^\w ]+/g, '')
			.replace(/ +/g, '-')
		return output_string;
	}
});

app.factory('getCategoryIdFromSlug', ['slugify', function(slugify){
	return function( obj, value ) {
    for( var prop in obj ) {
        if( obj.hasOwnProperty( prop ) ) {
             if( slugify(obj[ prop ]) === value )
                 return prop;
        }
    }
}
}]);

app.factory('navUpdate', ['$rootScope', function($rootScope){
	return function(obj) {
		var h1 = obj.intro.h1 || obj.intro.title,
		h2 = obj.intro.h2 || obj.intro.subtitle,
		hero_image = obj.intro.image_primary || obj.intro.featured_image;
		$rootScope.nav = angular.extend($rootScope.nav, obj);
		$rootScope.nav.post_categories = Categories.post;
		$rootScope.nav.hero_title = h1;
		$rootScope.nav.hero_subtitle = h2;
		$rootScope.nav.hero_image = hero_image;
		$rootScope.nav.page.description = h1 + ', ' + h2;
	}
}]);

app.factory('postJSON', ['$location', '$http', function($location, $http) {
	return function(obj, url, callback) {
		$http({
			method: "POST",
			url: [$location.origin, url].join(''),
			withCredentials: true,
			data: obj,
		}).then(function(data) {
			if (typeof callback !== undefined) {
				callback(data);
			}
		});
	}
}]);

app.filter('slugify', ['slugify', function(slugify) {
	return function(item) {	
		return slugify(item);
	};
}]);

app.filter('markdown', ['markdown', function(markdown) {
	return function(item) {
		var output_string = markdown(item)
		return output_string;
	};
}]);

app.filter('effect', function() {
	return function(value, arg) {
		var output_string = "https://process.filestackapi.com/" + settings.FILEPICKER_API_KEY + "/" + encodeURI(arg) + "/" + value
		return !!value && !!arg ? output_string: '';
	};
});

app.filter('resize', function() {
	return function(value, arg) {
		var output_string = "https://process.filestackapi.com/" + settings.FILEPICKER_API_KEY + "/resize=" + encodeURI(arg) + "/" + value
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

app.run(function($timeout, $rootScope, $http, $location, postJSON) {

	$rootScope.nav = $rootScope.nav || {};
	$http.get([$location.origin, '/api/person/', '?name=Italo&format=json'].join('')).then(function(person) {
		$rootScope.nav.person = person.data[0];
		$rootScope.nav.title = [$rootScope.nav.person.name, $rootScope.nav.person.lastname, "'s resume"].join('');
	});

	$rootScope.$on('$viewContentLoaded', function() {
		$timeout(function() {
			$(document).on('click', 'a[href].active', function(e) {
					e.preventDefault();
				});
			$('.js-lazy').lazyload();
		}, 500);
	});

	$rootScope.markdown = function(item) {
		return markdown(item);
	};
});