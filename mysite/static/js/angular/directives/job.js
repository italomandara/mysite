app.directive('job', function() { 
  return { 
    restrict: 'E', 
    templateUrl: DJ.static('js/angular/directives/job.html'),
    replace: true
  }; 
});
