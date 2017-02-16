app.directive('includeReplace', function() {
  return {
    require: 'ngInclude',
    restrict: 'A',
    /* optional */
    link: function(scope, el, attrs) {
      el.replaceWith(el.children());
    }
  };
});

app.directive('skill', function() { 
  return { 
    restrict: 'E', 
    templateUrl: DJ.static('js/angular/templates/skill.html'),
    replace: true
  }; 
});

app.directive('job', function() { 
  return { 
    restrict: 'E', 
    templateUrl: DJ.static('js/angular/templates/job.html'),
    replace: true
  }; 
});

app.directive('row', function() { 
  return { 
    restrict: 'E',
    scope: { 
      mycontent: '=',
      customclass: '='
    },
    templateUrl: DJ.static('js/angular/templates/row.html'),
    replace: true
  }; 
});

app.directive('course', function() { 
  return { 
    restrict: 'E',
    templateUrl: DJ.static('js/angular/templates/course.html'),
    replace: true
  }; 
});

app.directive('backgroundimage', function(){
    return function(scope, element, attrs){
        var url = attrs.backgroundimage;
        element.css({
            'background-image': 'url(' + url +')',
        });
    };
});
