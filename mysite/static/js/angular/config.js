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
app = angular.module('myResume', ['ui.router', 'ngSanitize', 'mm.foundation', 'ngTouch', 'ngAnimate'])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {

		$locationProvider.hashPrefix('');
		$urlRouterProvider.otherwise('/');

			$stateProvider.state('home', {
				url: '/',
				templateUrl: DJ.static('js/angular/templates/home.html'),
				controller: 'homeController'
			})
			.state('more', {
				url: '/more',
				templateUrl: DJ.static('js/angular/templates/more.html'),
				controller: 'moreController'
			})
			.state('thoughts', {
				url: '/thoughts',
				templateUrl: DJ.static('js/angular/templates/thoughts/index.html'),
				controller: 'thoughtsController'
			})
			.state('category', {
				url: '/thoughts/categories/:category',
				templateUrl: DJ.static('js/angular/templates/thoughts/category.html'),
				controller: 'postCategoriesController'
			})
			.state('posts', {
				url: '/thoughts/posts/:slug',
				templateUrl: DJ.static('js/angular/templates/thoughts/post.html'),
				controller: 'postController'
			})
			.state('404', {
				url: '/404',
				templateUrl: DJ.static('js/angular/templates/404.html'),
				controller: 'homeController'
			});	
	}
])
.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);