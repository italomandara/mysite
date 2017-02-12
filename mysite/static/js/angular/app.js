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

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: DJ.static('js/angular/templates/home.html'),
			controller: 'homeController'
		})
	}
])

app.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
}]);

app.directive('includeReplace', function() {
	return {
		require: 'ngInclude',
		restrict: 'A',
		/* optional */
		link: function(scope, el, attrs) {
			el.replaceWith(el.children());
		}
	};
});

app.run(function($timeout, $rootScope){
    $timeout(function() {
        $(document).foundation();
    }, 500);

    $rootScope.markdown = function(item) {
		var item_defined = typeof item !== typeof undefined;
		var item_is_string = typeof item === typeof "a";
		if (item_defined && item_is_string) {
			return marked(item);
		}
	};
});
