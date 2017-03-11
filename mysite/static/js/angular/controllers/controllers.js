app.controller('alertController', ['$rootScope', function($rootScope) {
	$rootScope.alerts = [];

	$rootScope.closeAlert = function(index) {
		$rootScope.alerts.splice(index, 1);
	};
}])
.controller('orbitController', ['$scope', function($scope) {
}])
.controller('offCanvasController', ['$scope', function($scope) {
}])
.controller('homeController', ['$rootScope', '$location', '$scope', '$http', 'navUpdate', 'CATEGORIES', function($rootScope, $location, $scope, $http, navUpdate, CATEGORIES) {
	$http.get([$location.origin, '/api/skill/', '?format=json'].join('')).then(function(skills_list) {
		$scope.skills_list = skills_list.data;
		$scope.skills_subcategories = $scope.skills_list.map(function(list) {
			return list.subcategory.toLowerCase();
		}).filter(function(elem, index, self) {
			return index == self.indexOf(elem);
		});
	});

	$scope.get_skill_category = function(a) {
		return CATEGORIES.skill[a]
	};

	$scope.skill_categories = CATEGORIES.skill;

	$http.get([$location.origin, '/api/job/', '?format=json'].join('')).then(function(job_history) {
		$scope.job_history = job_history.data;
	});
	$scope.job_categories = CATEGORIES.job;
	$scope.get_job_category = function(a) {
		return CATEGORIES.job[a]
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
		var $el = angular.element(e.target);
		if (!angular.isUndefined(e)) {
			e.preventDefault();
		}
		$el.siblings('[data-filter], [data-filter-sub]').removeClass('active');
		$el.addClass('active');
		var category = $el.attr_safe('data-filter');
		var subcategory = $el.attr_safe('data-filter-sub');
		var el_class = '.category-' + category;
		var el_class_sub = '.subcategory-' + subcategory;

		// '.subcategory-' + el_class_sub
		if (!angular.isUndefined(category) && category.toLowerCase() === 'none') {
			$$('.js-filter').css('opacity', 1);
		} else {
			$$('.js-filter:not('+el_class + ', ' + el_class_sub+')').css({
				'opacity': 0.3,
			});
			$$(el_class + ', ' + el_class_sub).css('opacity', 1);
		}
		return true;
	};
}])
.controller('moreController', ['$rootScope', '$location', '$scope', '$http', 'navUpdate', 'CATEGORIES', function($rootScope, $location, $scope, $http, navUpdate, CATEGORIES) {
	$http.get([$location.origin, '/api/course/', '?format=json'].join('')).then(function(courses) {
		$scope.courses = courses.data;
	});
	$scope.course_categories = CATEGORIES.course;
	$scope.get_course_category = function(a) {
		return CATEGORIES.course[a]
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
			}
		});
	});
}])
.controller('thoughtsController', ['$rootScope', '$location', '$scope', '$http', 'navUpdate', 'CATEGORIES', function($rootScope, $location, $scope, $http, navUpdate, CATEGORIES) {
	$http.get([$location.origin, '/api/post/', '?ordering=-created_at&format=json'].join('')).then(function(posts) {
		$scope.posts = posts.data;
	});
	$scope.post_categories = CATEGORIES.post;
	$scope.get_post_category = function(a) {
		return CATEGORIES.post[a]
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
			}
		});
	});
}])
.controller('postCategoriesController', ['$rootScope', '$location', '$scope', '$http', '$stateParams', 'navUpdate', 'slugify', 'getCategoryIdFromSlug', 'CATEGORIES', function($rootScope, $location, $scope, $http, $stateParams, navUpdate, slugify, getCategoryIdFromSlug, CATEGORIES) {
	var cat = $stateParams.category;
	var category = getCategoryIdFromSlug(CATEGORIES.post, cat);
	$http.get([$location.origin, '/api/post/', '?ordering=-created_at&category=', category, '&format=json'].join('')).then(function(posts) {
		$scope.posts = posts.data;
		if(!posts.data.length) {
			$scope.error = {
				title : 'Sorry,',
				description: "couldn't find any posts in this category" 
			}
		}
	});
	$scope.post_categories = CATEGORIES.post;
	$scope.get_post_category = function(a) {
		return CATEGORIES.post[a]
	};

	$http.get([$location.origin, '/api/mycontent/', '?slug=', slugify(cat), '&format=json'].join('')).then(function(intro) {
		$scope.intro = intro.data[0];
		var page = {
			'title': cat,
			'name': 'thoughts',
		}
		page[CATEGORIES.post[category]] = active_navigation_class;
		navUpdate({
			is_video: false,
			is_standard_hero: false,
			intro: $scope.intro,
			hero_class: '',
			page: page
		});
	});
}])
.controller('postController', ['$rootScope', '$location', '$scope', '$http', '$stateParams', 'navUpdate', 'CATEGORIES', function($rootScope, $location, $scope, $http, $stateParams, navUpdate, CATEGORIES) {
	var slug = $stateParams.slug;
	$http.get([$location.origin, '/api/post/', slug, '/?format=json'].join('')).then(function(post) {
		$scope.post = post.data;
		$scope.post.get_category = function(a) {
			return CATEGORIES.post[a];
		}($scope.post.category);
		navUpdate({
			is_video: false,
			is_standard_hero: true,
			intro: $scope.post,
			hero_class: '',
			page: {
				'title': 'Post | ' + $scope.post.title,
				'name': 'Blog post',
			}
		});
	});
}])
.controller('contactController', ['$location', '$scope', '$rootScope', '$modal', '$http', 'postJSON', function($location, $scope, $rootScope,$modal, $http, postJSON) {
	$scope.open = function() {
		var params = {
			templateUrl: DJ.static('js/angular/templates/shared/modal.html'),
			controller: function($scope, $rootScope, $modalInstance, $http, postJSON) {
				var url = '/api/contact/'
				$http({
					method: "OPTIONS",
					url: [$location.origin, url].join(''),
					withCredentials: true,
				}).then(function(form) {
					$scope.form = form.data.actions.POST;
					$scope.form.message.type = 'textarea';
					$scope.form.phone.pattern = /[0-9]{10,15}/i;
					$scope.form.email.type = 'email';
				});
				$scope.model = {};
				$scope.title = 'Contact form';
				$scope.modal_content = DJ.static('js/angular/templates/modals/contact.html');
				$scope.ok = function(is_valid, e) {
					$scope.submitted = true;
					if (is_valid) {
						postJSON($scope.model, url, function($rootScope) {
							$modalInstance.close();
						});
					}
				};
				$scope.email = "please enter a valid email address";
				$scope.required = "this field is required";
				$scope.phone = "please enter a valid phone number";
				$scope.cancel = function() {
					$modalInstance.dismiss('cancel');
				};
			}
		};
		var modalInstance = $modal.open(params);
		modalInstance.result.then(function() {
			$rootScope.alerts.push({type:'success', msg:"Thank you for contacting me, I'll read the notification along with your contact data and get back to you, see you soon!"});
		},function(){});
	};
}]);