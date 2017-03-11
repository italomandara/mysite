app.directive('job', ['static', function(static) { 
  return { 
    restrict: 'E', 
    templateUrl: static('js/angular/directives/job.html'),
    replace: true
  }; 
}]);
