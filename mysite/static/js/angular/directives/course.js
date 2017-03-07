app.directive('course', function() { 
  return { 
    restrict: 'E',
    templateUrl: DJ.static('js/angular/directives/course.html'),
    replace: true
  }; 
});