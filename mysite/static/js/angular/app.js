app
.factory('markdown', function() {
	return function(item) {
		var item_is_string = typeof item === typeof "a";
		if (!angular.isUndefined(item) && item_is_string) {
			return marked(item);
		} else {
			return '';
		}
	}
})
.factory('static', ['SETTINGS', function(SETTINGS) {
	return function(item) {
		return [SETTINGS.STATIC_ROOT, item].join('');
	}
}])
.factory('slugify', function() {
	return function(item) {
		var output_string = item
			.toLowerCase()
			.replace(/[^\w ]+/g, '')
			.replace(/ +/g, '-')
		return output_string;
	}
})
.factory('getCategoriesSlugs', ['CATEGORIES', 'slugify', function(CATEGORIES, slugify) {
	return function(mymodel) {
		var obj = {};
		var categories = CATEGORIES[mymodel];
		for (var idx in categories) {
			var cat = categories[idx]
			obj[idx] = {slug: slugify(cat), name: cat};
		}
		return obj;
	};
}])
.factory('getCategoryIdFromSlug', ['slugify', function(slugify){
	return function( obj, value ) {
    for( var prop in obj ) {
        if( obj.hasOwnProperty( prop ) ) {
             if( slugify(obj[ prop ]) === value )
                 return prop;
        }
    }
}
}])
.factory('navUpdate', ['$rootScope', 'getCategoriesSlugs', function($rootScope, getCategoriesSlugs){
	return function(obj) {
		var h1 = obj.intro.h1 || obj.intro.title,
		h2 = obj.intro.h2 || obj.intro.subtitle,
		hero_image = obj.intro.image_primary || obj.intro.featured_image;
		$rootScope.nav = angular.extend($rootScope.nav, obj);
		$rootScope.nav.post_categories = getCategoriesSlugs('post');
		$rootScope.nav.hero_title = h1;
		$rootScope.nav.hero_subtitle = h2;
		$rootScope.nav.hero_image = hero_image;
		$rootScope.nav.page.description = h1 + ', ' + h2;
	}
}])
.factory('postJSON', ['$location', '$http', function($location, $http) {
	return function(obj, url, callback) {
		$http({
			method: "POST",
			url: [$location.origin, url].join(''),
			withCredentials: true,
			data: obj,
		}).then(function(data) {
			if (!angular.isUndefined(callback)) {
				callback(data);
			}
		});
	}
}])
.filter('slugify', ['slugify', function(slugify) {
	return function(item) {	
		return slugify(item);
	};
}])
.filter('markdown', ['markdown', function(markdown) {
	return function(item) {
		var output_string = markdown(item)
		return output_string;
	};
}])
.filter('effect', ['SETTINGS', function(SETTINGS) {
	return function(value, arg) {
		var output_string = "https://process.filestackapi.com/" + SETTINGS.FILEPICKER_API_KEY + "/" + encodeURI(arg) + "/" + value
		return !!value && !!arg ? output_string: '';
	};
}])
.filter('resize', ['SETTINGS', function(SETTINGS) {
	return function(value, arg) {
		var output_string = "https://process.filestackapi.com/" + SETTINGS.FILEPICKER_API_KEY + "/resize=" + encodeURI(arg) + "/" + value
		return !!value && !!arg ? output_string: '';
	};
}])
.run(function($timeout, $rootScope, $http, $location, postJSON) {
	$rootScope.nav = $rootScope.nav || {};
	$http.get([$location.origin, '/api/person/', '?name=Italo&format=json'].join('')).then(function(person) {
		$rootScope.nav.person = person.data[0];
		$rootScope.nav.title = [$rootScope.nav.person.name, ' ', $rootScope.nav.person.lastname, "'s resume"].join('');
	});
	$rootScope.$on('$viewContentLoaded', function() {
		$timeout(function() {
			var myLazyLoad = new LazyLoad({
			    threshold: 500,
			    elements_selector: ".js-lazy",
			    throttle: 200,
			});
		}, 500);
	});
});