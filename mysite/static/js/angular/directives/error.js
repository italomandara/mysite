app.directive('error', function() { 
  return { 
    restrict: 'E',
    templateUrl: DJ.static('js/angular/directives/error.html'),
    replace: true
  }; 
});