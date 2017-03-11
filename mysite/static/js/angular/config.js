var active_navigation_class = 'active';
var $$ = function(selector) {
	return angular.element(document.body.querySelectorAll(selector) || []);
}
angular.element.prototype.attr_safe = function(attribute) {
	return (!angular.isUndefined(this.attr(attribute)) || !this.attr(attribute)) ? this.attr(attribute) : 'undefined';
};
angular.element.prototype.siblings = function(selector) {
	return this.parent().children(selector);
};

deferredBootstrapper.bootstrap({
	element: document.getElementById('app'),
	module: 'myResume',
	resolve: {
		CATEGORIES: ['$http', '$location', function($http, $location) {
			return $http.get([$location.origin, '/api/categories/', '?format=json'].join(''));
		}],
		SETTINGS: ['$http', '$location', function($http, $location) {
			return $http.get([$location.origin, '/api/s/', '?format=json'].join(''));
		}],
	},
	onError: function(error) {
		console.error('Could not bootstrap, error: ' + error);
	}
});

app = angular
	.module('myResume', ['ui.router', 'ngSanitize', 'mm.foundation', 'ngTouch', 'ngAnimate'])
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'SETTINGS',
		function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, SETTINGS) {
			var static = function(url) {
				return [SETTINGS.STATIC_ROOT, url].join('');
			};

			$httpProvider.defaults.xsrfCookieName = 'csrftoken';
			$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

			// $locationProvider.hashPrefix('');
			$urlRouterProvider.otherwise('/');

			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: static('js/angular/templates/home.html'),
					controller: 'homeController'
				})
				.state('more', {
					url: '/more',
					templateUrl: static('js/angular/templates/more.html'),
					controller: 'moreController'
				})
				.state('thoughts', {
					url: '/thoughts',
					templateUrl: static('js/angular/templates/thoughts/index.html'),
					controller: 'thoughtsController'
				})
				.state('category', {
					url: '/thoughts/categories/:category',
					templateUrl: static('js/angular/templates/thoughts/category.html'),
					controller: 'postCategoriesController'
				})
				.state('posts', {
					url: '/thoughts/posts/:slug',
					templateUrl: static('js/angular/templates/thoughts/post.html'),
					controller: 'postController'
				})
				.state('404', {
					url: '/404',
					templateUrl: static('js/angular/templates/404.html'),
					controller: 'homeController'
				});
		}
	]);