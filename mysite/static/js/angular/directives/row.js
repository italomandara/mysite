app.directive('row', function() { 
  return { 
    restrict: 'E',
    scope: { 
      mycontent: '=',
      customclass: '='
    },
    templateUrl: DJ.static('js/angular/directives/row.html'),
    replace: true
  }; 
});