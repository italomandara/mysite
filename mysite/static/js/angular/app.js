var app = angular.module("myResume", ['ngRoute', 'ngSanitize']);

$.fn.attr_safe = function(attribute) {
	return (typeof this.attr(attribute) !== typeof undefined || !this.attr(attribute)) ? this.attr(attribute) : 'undefined';
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

app.filter('markdown', function(){
	return function(item) {
		var output_string = marked(item)
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
	}
])

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

app.run(function($timeout, $rootScope){
    $timeout(function() {
        $(document).foundation();
    }, 1000);

    $rootScope.markdown = function(item) {
		var item_defined = typeof item !== typeof undefined;
		var item_is_string = typeof item === typeof "a";
		if (item_defined && item_is_string) {
			return marked(item);
		}
	};
});
