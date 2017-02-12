var app = angular.module("myResume", ['ngRoute', 'ngSanitize']);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: DJ.static('js/angular/templates/base.html'),
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

app.run(function($timeout){
    $timeout(function() {
        $(document).foundation();
    }, 500);
});
