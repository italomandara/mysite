app.directive('row', ['static', function(static) {
  return { 
    restrict: 'E',
    scope: { 
      mycontent: '=',
      customclass: '='
    },
    templateUrl: static('js/angular/directives/row.html'),
    replace: true
  }; 
}]);