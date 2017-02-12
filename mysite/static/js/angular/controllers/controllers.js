// template = loader.get_template('home/index.html')
// person = Person.objects.get(name__iexact='italo')
// skills_list = Skill.objects.all()
// job_history = Job.objects.all().order_by('-end_date')
// education = Course.objects.all().order_by('-end_date')
// intro = MyContent.objects.get(slug='intro')
// achievements = MyContent.objects.get(slug='achievements')
// profile = MyContent.objects.get(slug='profile')
// form = ContactForm()
// skill_categories = Skill.TYPES
// skill_subcategories = Skill.objects.values_list('subcategory').distinct()
// hostname = socket.gethostname()
// post_categories = Post.CATEGORIES

// var resumeControllers = angular.module('resumecontrollers', []);

// resumeControllers.resumeControllers('personController', ['$scope', '$routeParams', '$http',
// 	function($scope, $routeParams, $http) {
// 		$http.get([window.location.origin,'/api/person/', '/?format=json'].join('')).success(function(data){
// 			$scope.person = data;
// 		})
// 	}
// ])

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
	};

app.controller('navController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
	$http.get([window.location.origin, '/api/person/', '?name=Italo&format=json'].join('')).then(function(person) {
		$rootScope.person = person.data[0];
		$scope.nav_title = [$rootScope.person.name , $rootScope.person.lastname , "'s resume"].join('');
	});
}]);

app.controller('homeController', ['$scope', '$http', function($scope, $http) {

	$http.get([window.location.origin, '/api/skill/', '?format=json'].join('')).then(function(skills_list) {
		$scope.skills_list = skills_list.data;
		$scope.skills_subcategories = $scope.skills_list.map(function(list) {
				return list.subcategory.toLowerCase();
			}).filter(function(elem, index, self) {
				return index == self.indexOf(elem);
			});
		$scope.get_skill_category = function(a) {return skill_categories[a]};

	});
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
		if (!!$scope.intro.image_primary) {
			$scope.hero_image = $scope.intro.image_primary;
		} else {
			$scope.hero_image = DJ.static('img/bg3.jpg');
		}
	});
	$http.get([window.location.origin, '/api/mycontent/', '?slug=achievements&format=json'].join('')).then(function(achievements) {
		$scope.achievements = achievements.data;
	});
	$http.get([window.location.origin, '/api/mycontent/', '?slug=profile&format=json'].join('')).then(function(profile) {
		$scope.profile = profile.data[0];
	});
	$scope.post_categories = post_categories;
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
}])