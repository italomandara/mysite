app.directive('includeReplace', function() {
  return {
    require: 'ngInclude',
    restrict: 'A',
    link: function(scope, el, attrs) {
      el.replaceWith(el.children());
    }
  };
})
.directive('backgroundimage', function(){
    return function(scope, element, attrs){
        var url = attrs.backgroundimage;
        element.css({
            'background-image': 'url(' + url +')',
        });
    };
});

