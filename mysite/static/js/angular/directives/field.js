app.directive('field', function() { 
  return { 
    restrict: 'E',
    templateUrl: DJ.static('js/angular/directives/field.html'),
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
});