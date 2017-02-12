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

app.controller('homeController', ['$scope', '$http', function($scope, $http) {
	$http.get([window.location.origin, '/api/person/', '?name=Italo&format=json'].join('')).then(function(person) {
		$scope.person = person.data[0];
	});
	$http.get([window.location.origin, '/api/skill/', '?format=json'].join('')).then(function(skills_list) {
		$scope.skills_list = skills_list.data;
	});
	$scope.skill_categories;

	$http.get([window.location.origin, '/api/job/', '?format=json'].join('')).then(function(job_history) {
		$scope.job_history = job_history.data;
	});
	$scope.job_categories = job_categories;

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
	$scope.$on('$viewContentLoaded', function(event) {
		$(document).foundation();
	});
}])