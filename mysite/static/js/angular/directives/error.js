app.directive('error', ['static', function(static) { 
  return { 
    restrict: 'E',
    templateUrl: static('js/angular/directives/error.html'),
    replace: true
  }; 
}]);