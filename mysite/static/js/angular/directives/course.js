app.directive('course', ['static', function(static) {
  return { 
    restrict: 'E',
    templateUrl: static('js/angular/directives/course.html'),
    replace: true
  }; 
}]);