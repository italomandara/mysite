app.directive('includeReplace', function() {
  return {
    require: 'ngInclude',
    restrict: 'A',
    link: function(scope, el, attrs) {
      el.replaceWith(el.children());
    }
  };
})
.directive('skill', function() { 
  return { 
    restrict: 'E', 
    templateUrl: DJ.static('js/angular/templates/skill.html'),
    replace: true
  }; 
})
.directive('job', function() { 
  return { 
    restrict: 'E', 
    templateUrl: DJ.static('js/angular/templates/job.html'),
    replace: true
  }; 
})
.directive('post', function() { 
  return { 
    restrict: 'E', 
    templateUrl: DJ.static('js/angular/templates/thoughts/partials/post.html'),
    replace: true
  }; 
})
.directive('row', function() { 
  return { 
    restrict: 'E',
    scope: { 
      mycontent: '=',
      customclass: '='
    },
    templateUrl: DJ.static('js/angular/templates/row.html'),
    replace: true
  }; 
})
.directive('course', function() { 
  return { 
    restrict: 'E',
    templateUrl: DJ.static('js/angular/templates/course.html'),
    replace: true
  }; 
})
.directive('error', function() { 
  return { 
    restrict: 'E',
    templateUrl: DJ.static('js/angular/templates/error.html'),
    replace: true
  }; 
})
.directive('field', function() { 
  return { 
    restrict: 'E',
    templateUrl: DJ.static('js/angular/templates/shared/field.html'),
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
})
.directive('backgroundimage', function(){
    return function(scope, element, attrs){
        var url = attrs.backgroundimage;
        element.css({
            'background-image': 'url(' + url +')',
        });
    };
});
