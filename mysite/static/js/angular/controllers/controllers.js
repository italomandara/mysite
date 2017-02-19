app.controller('homeController', ['$rootScope', '$location', '$scope', '$http', 'navUpdate', function($rootScope, $location, $scope, $http, navUpdate) {
	$http.get([$location.origin, '/api/skill/', '?format=json'].join('')).then(function(skills_list) {
		$scope.skills_list = skills_list.data;
		$scope.skills_subcategories = $scope.skills_list.map(function(list) {
			return list.subcategory.toLowerCase();
		}).filter(function(elem, index, self) {
			return index == self.indexOf(elem);
		});
	});

	$scope.get_skill_category = function(a) {
		return Categories.skill[a]
	};

	$scope.skill_categories = Categories.skill;

	$http.get([$location.origin, '/api/job/', '?format=json'].join('')).then(function(job_history) {
		$scope.job_history = job_history.data;
	});
	$scope.job_categories = Categories.job;
	$scope.get_job_category = function(a) {
		return Categories.job[a]
	};

	$http.get([$location.origin, '/api/course/', '?format=json'].join('')).then(function(course) {
		$scope.course = course.data;
	});
	$http.get([$location.origin, '/api/mycontent/', '?slug=intro&format=json'].join('')).then(function(intro) {
		$scope.intro = intro.data[0];
		navUpdate({
			is_video: true,
			is_standard_hero: true,
			intro: $scope.intro,
			hero_class: 'background-video',
			page: {
				'title': 'home',
				'name': 'home',
				'index': active_navigation_class,
			}
		});
	});
	$http.get([$location.origin, '/api/mycontent/', '?slug=achievements&format=json'].join('')).then(function(achievements) {
		$scope.achievements = achievements.data;
	});
	$http.get([$location.origin, '/api/mycontent/', '?slug=profile&format=json'].join('')).then(function(profile) {
		$scope.profile = profile.data[0];
	});

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

app.controller('moreController', ['$rootScope', '$location', '$scope', '$http', 'navUpdate', function($rootScope, $location, $scope, $http, navUpdate) {
	$http.get([$location.origin, '/api/course/', '?format=json'].join('')).then(function(courses) {
		$scope.courses = courses.data;
	});
	$scope.course_categories = Categories.course;
	$scope.get_course_category = function(a) {
		return Categories.course[a]
	};

	$http.get([$location.origin, '/api/mycontent/', '?slug=skills&format=json'].join('')).then(function(skills) {
		$scope.skills = skills.data[0];
	});

	$http.get([$location.origin, '/api/mycontent/', '?slug=achievements&format=json'].join('')).then(function(achievements) {
		$scope.achievements = achievements.data[0];
	});

	$http.get([$location.origin, '/api/mycontent/', '?slug=more&format=json'].join('')).then(function(intro) {
		$scope.intro = intro.data[0];
		navUpdate({
			is_video: false,
			is_standard_hero: true,
			intro: $scope.intro,
			hero_class: '',
			hero_image: DJ.static('img/bg.jpg'),
			page: {
				'title': 'more',
				'name': 'more',
				'more': active_navigation_class,
			}
		});
	});
}]);

app.controller('thoughtsController', ['$rootScope', '$location', '$scope', '$http', 'navUpdate', function($rootScope, $location, $scope, $http, navUpdate) {
	$http.get([$location.origin, '/api/post/', '?format=json'].join('')).then(function(posts) {
		$scope.posts = posts.data;
	});
	$scope.post_categories = Categories.post;
	$scope.get_post_category = function(a) {
		return Categories.post[a]
	};

	$http.get([$location.origin, '/api/mycontent/', '?slug=thoughts-intro&format=json'].join('')).then(function(intro) {
		$scope.intro = intro.data[0];
		navUpdate({
			is_video: false,
			is_standard_hero: true,
			intro: $scope.intro,
			hero_class: '',
			page: {
				'title': 'blog',
				'name': 'thoughts',
				'thoughts': active_navigation_class,
			}
		});
	});
}]);

app.controller('postCategoriesController', ['$rootScope', '$location', '$scope', '$http', '$routeParams', 'navUpdate', function($rootScope, $location, $scope, $http, $routeParams, navUpdate) {
	var cat = $routeParams.category;
	var category = getCategoryIdFromSlug(Categories.post, cat);
	$http.get([$location.origin, '/api/post/', '?category=', category, '&format=json'].join('')).then(function(posts) {
		$scope.posts = posts.data;
	});
	$scope.post_categories = Categories.post;
	$scope.get_post_category = function(a) {
		return Categories.post[a]
	};

	$http.get([$location.origin, '/api/mycontent/', '?slug=', slugify(cat), '&format=json'].join('')).then(function(intro) {
		$scope.intro = intro.data[0];
		var page = {
			'title': 'blog',
			'name': 'thoughts',
			'thoughts': active_navigation_class,
		}
		page[Categories.post[category]] = active_navigation_class;
		navUpdate({
			is_video: false,
			is_standard_hero: false,
			intro: $scope.intro,
			hero_class: '',
			page: page
		});
	});
}]);

app.controller('postController', ['$rootScope', '$location', '$scope', '$http', '$routeParams', 'navUpdate', function($rootScope, $location, $scope, $http, $routeParams, navUpdate) {
	var slug = $routeParams.slug;

	$http.get([$location.origin, '/api/post/', slug, '/?format=json'].join('')).then(function(post) {
		$scope.post = post.data;
		$scope.post.get_category = function(a) {
			return Categories.post[a];
		}($scope.post.category);
		navUpdate({
			is_video: false,
			is_standard_hero: true,
			intro: $scope.post,
			hero_class: '',
			page: {
				'title': 'Post | ' + $scope.post.title,
				'name': 'Blog post',
				'thoughts': active_navigation_class,
			}
		});
	});
}]);