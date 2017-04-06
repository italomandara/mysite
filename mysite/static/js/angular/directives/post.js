app.directive('post', function() { 
  return { 
    restrict: 'E', 
    templateUrl: DJ.static('js/angular/directives/post.html'),
    replace: true
  }; 
});