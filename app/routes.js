'use strict';

var app.config(['$routeProvider', function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl: 'app/pages/landing.html',
		controller: 'LandingCtrl'
	});

	$routeProvider.when('/guest', {
		templateUrl: 'app/pages/guest-view.html',
		controller: 'GuestCtrl'
	});

	$routeProvider.when('/admin', {
		templateUrl: 'app/pages/admin-view.html',
		controller: 'AdminCtrl'
	});

	$routeProvider.otherwise({redirectTo: '/'});
}]);