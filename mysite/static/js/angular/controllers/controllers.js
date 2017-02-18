var skill_categories = {
		'PR': 'Print',
		'DS': 'Design',
		'CO': 'Coding',
		'HU': 'Human',
	},
	job_categories = {
		'PR': 'Print',
		'DS': 'Design',
		'CO': 'Coding',
		'OT': 'Human'
	},
	post_categories = {
		'TC': 'Technology',
		'LF': 'Life',
		'CS': 'Courses',
		'CD': 'Coding',
	},
	course_categories = {
		'PR': 'Print',
		'DS': 'Design',
		'CO': 'Coding',
		'HU': 'Human',
		'SC': 'School'
	},
	active_navigation_class = 'active';

app.controller('headController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
	$http.get([window.location.origin, '/api/mycontent/', '?slug=intro&format=json'].join('')).then(function(intro) {
		$rootScope.intro = intro.data[0];
		$rootScope.page = {
			'title': 'home',
			'name': 'home',
			'index': active_navigation_class,
			'description': $rootScope.intro.h1 + ', ' + $rootScope.intro.h2,
		}
	});
}]);

app.controller('postController', ['$rootScope', '$scope', '$http', '$routeParams', function($rootScope, $scope, $http, $routeParams) {
    var slug = $routeParams.slug;
    // self.qStrName = $routeParams.name;
    // self.qStrAge = $routeParams.age;

	$http.get([window.location.origin, '/api/post/', slug ,'/?format=json'].join('')).then(function(post) {
		$scope.post = post.data;
	    $rootScope.hero_title=$scope.post.title;
	    $rootScope.hero_subtitle=$scope.post.subtitle;
	    $rootScope.hero_image=$scope.post.featured_image;
    	$scope.post.get_category = function(a) {
			return post_categories[a];
		}($scope.post.category);
	});

	$http.get([window.location.origin, '/api/mycontent/', '?slug=intro&format=json'].join('')).then(function(intro) {
		$rootScope.intro.h1 = intro.data[0].h1;
		$rootScope.intro.h2 = intro.data[0].h2;
		$rootScope.page = {
			'title': 'home',
			'name': 'home',
			'index': active_navigation_class,
			'description': $rootScope.intro.h1 + ', ' + $rootScope.intro.h2,
		}
	});
                          
}]);

app.controller('navController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
	$rootScope.is_video = true;
	$rootScope.is_standard_hero = true;

	$http.get([window.location.origin, '/api/person/', '?name=Italo&format=json'].join('')).then(function(person) {
		$rootScope.person = person.data[0];
		$rootScope.nav_title = [$rootScope.person.name , $rootScope.person.lastname , "'s resume"].join('');
	});

	$http.get([window.location.origin, '/api/mycontent/', '?slug=intro&format=json'].join('')).then(function(intro) {
		$rootScope.intro = intro.data[0];
		$rootScope.hero_title = $rootScope.intro.h1;
		$rootScope.hero_subtitle = $rootScope.intro.h2;
		$rootScope.hero_image = $rootScope.intro.image_primary;
		$rootScope.page = {
			'title': 'home',
			'name': 'home',
			'index': active_navigation_class,
			'description': intro.h1 + ', ' + intro.h2 ,
		}
	});
	$rootScope.post_categories = post_categories;
	$rootScope.hero_class='background-video';
}]);

app.controller('homeController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
	$rootScope.is_video = true;
	$rootScope.is_standard_hero = true;
	$http.get([window.location.origin, '/api/skill/', '?format=json'].join('')).then(function(skills_list) {
		$scope.skills_list = skills_list.data;
		$scope.skills_subcategories = $scope.skills_list.map(function(list) {
			return list.subcategory.toLowerCase();
		}).filter(function(elem, index, self) {
			return index == self.indexOf(elem);
		});
	});
	$scope.get_skill_category = function(a) {
		return skill_categories[a]
	};
	$scope.skill_categories = skill_categories;

	$http.get([window.location.origin, '/api/job/', '?format=json'].join('')).then(function(job_history) {
		$scope.job_history = job_history.data;
	});
	$scope.job_categories = job_categories;
	$scope.get_job_category = function(a) {return job_categories[a]};

	$http.get([window.location.origin, '/api/course/', '?format=json'].join('')).then(function(course) {
		$scope.course = course.data;
	});
	$http.get([window.location.origin, '/api/mycontent/', '?slug=intro&format=json'].join('')).then(function(intro) {
		$scope.intro = intro.data[0];
		$scope.hero_title = $scope.intro.h1;
		$scope.hero_subtitle = $scope.intro.h2;
		$rootScope.hero_image = $scope.intro.image_primary;
		$rootScope.page = {
			'title': 'home',
			'name': 'home',
			'index': active_navigation_class,
			'description': intro.h1 + ', ' + intro.h2,
		}
	});
	$http.get([window.location.origin, '/api/mycontent/', '?slug=achievements&format=json'].join('')).then(function(achievements) {
		$scope.achievements = achievements.data;
	});
	$http.get([window.location.origin, '/api/mycontent/', '?slug=profile&format=json'].join('')).then(function(profile) {
		$scope.profile = profile.data[0];
	});
	$scope.hero_class='background-video';

	$scope.filter_el = function(e) {
		var $el = $(e.target);
		if (typeof e !== typeof undefined) {
			e.preventDefault();
		}
		$el.addClass('active').siblings('[data-filter], [data-filter-sub]').removeClass('active');
		var category = $el.attr_safe('data-filter');
		var subcategory = $el.attr_safe('data-filter-sub');
		var el_class = '.category-' + category;
		var el_class_sub = '.subcategory-' + subcategory;

		// '.subcategory-' + el_class_sub
		if (typeof category !== typeof undefined && category.toLowerCase() === 'none') {
			$('.js-filter').removeAttr('style');
		} else {
			$('.js-filter').not(el_class + ', ' + el_class_sub).css({
				'opacity': 0.3,
			});
			$(el_class + ', ' + el_class_sub).removeAttr('style');
		}
		return true;
	};
}]);

app.controller('moreController', ['$rootScope','$scope', '$http', function($rootScope, $scope, $http) {
	$rootScope.is_video = false;
	$rootScope.is_standard_hero = true;
	$http.get([window.location.origin, '/api/course/', '?format=json'].join('')).then(function(courses) {
		$scope.courses = courses.data;
	});
	$scope.course_categories = course_categories;
	$scope.get_course_category = function(a) {return course_categories[a]};

	$http.get([window.location.origin, '/api/mycontent/', '?slug=skills&format=json'].join('')).then(function(skills) {
		$scope.skills = skills.data[0];
	});
	$http.get([window.location.origin, '/api/mycontent/', '?slug=achievements&format=json'].join('')).then(function(achievements) {
		$scope.achievements = achievements.data[0];
	});

	$http.get([window.location.origin, '/api/mycontent/', '?slug=intro&format=json'].join('')).then(function(intro) {
		$rootScope.intro = intro.data[0];
		$rootScope.hero_title = $rootScope.intro.h1;
		$rootScope.hero_subtitle = $rootScope.intro.h2;
		$rootScope.hero_image = DJ.static('img/bg.jpg');
		$rootScope.page = {
			'title': 'more',
			'name': 'more',
			'more': active_navigation_class,
			'description': intro.h1 + ', ' + intro.h2,
		}
	});
}]);

app.controller('thoughtsController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
	$rootScope.is_video = false;
	$http.get([window.location.origin, '/api/post/', '?format=json'].join('')).then(function(posts) {
		$scope.posts = posts.data;
	});
	$scope.post_categories = course_categories;
	$scope.get_post_category = function(a) {
		return post_categories[a]
	};

	$http.get([window.location.origin, '/api/mycontent/', '?slug=thoughts-intro&format=json'].join('')).then(function(intro) {
		$rootScope.intro = intro.data[0];
		$rootScope.hero_title = $rootScope.intro.h1;
		$rootScope.hero_subtitle = $rootScope.intro.h2;
		if (intro.image_primary) {
			$rootScope.hero_image = intro.image_primary;
		} else {
			$rootScope.hero_image = DJ.static('img/bg_blog.jpg');
		}
		$rootScope.page = {
			'title': 'blog',
			'name': 'thoughts',
			'thoughts': active_navigation_class,
			'description': intro.h1 + ', ' + intro.h2,
		}
	});
}]);

app.controller('postCategoriesController', ['$rootScope', '$scope', '$http', '$routeParams', function($rootScope, $scope, $http, $routeParams) {
	$rootScope.is_video = false;
	$rootScope.is_standard_hero = false;
	var cat = $routeParams.category;
	var category = getCategoryIdFromSlug(post_categories,cat);
	$http.get([window.location.origin, '/api/post/', '?category=', category, '&format=json'].join('')).then(function(posts) {
		$scope.posts = posts.data;
	});
	$scope.post_categories = post_categories;
	$scope.get_post_category = function(a) {
		return post_categories[a]
	};

	$http.get([window.location.origin, '/api/mycontent/', '?slug=', slugify(cat), '&format=json'].join('')).then(function(intro) {
		$rootScope.intro = intro.data[0];
		$rootScope.hero_title = $rootScope.intro.h1;
		$rootScope.hero_subtitle = $rootScope.intro.h2;
		if ($rootScope.intro.image_primary) {
			$rootScope.hero_image = $rootScope.intro.image_primary;
		} else {
			$rootScope.hero_image = DJ.static('img/bg_blog.jpg');
		}
		$rootScope.page = {
			'title': 'blog',
			'name': 'thoughts',
			'thoughts': active_navigation_class,
			'description': intro.h1 + ', ' + intro.h2,
		}
	});
}]);