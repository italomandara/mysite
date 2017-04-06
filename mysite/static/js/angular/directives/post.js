app.directive('post', ['static', function(static) { 
  return { 
    restrict: 'E', 
    templateUrl: static('js/angular/directives/post.html'),
    replace: true
  }; 
}]);