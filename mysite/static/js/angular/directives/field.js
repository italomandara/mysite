app.directive('field', ['static', function(static) { 
  return { 
    restrict: 'E',
    templateUrl: static('js/angular/directives/field.html'),
    scope: { 
      field: '=',
      submitted: '=',
      form: '=',
      error: '=',
      model: '=',
      name: '=',
      pattern: '=',
    },
    replace: true,
    transclude: true,
  }; 
}]);