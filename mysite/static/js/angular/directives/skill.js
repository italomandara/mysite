app.directive('skill', ['static', function(static) { 
  return { 
    restrict: 'E', 
    templateUrl: static('js/angular/directives/skill.html'),
    replace: true
  }; 
}]);


