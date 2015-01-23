'use strict';

define(['angular', 'app'], function(angular, app) {

	return app.config(['$routeProvider', function($routeProvider) {

		$routeProvider.when('/landing', {
			templateUrl: 'app/partials/landing.html',
			controller: 'LandingCtrl'
		});

		$routeProvider.when('/guest', {
			templateUrl: 'app/partials/guest-view.html',
			controller: 'GuestCtrl'
		});

		$routeProvider.when('/admin', {
			templateUrl: 'app/partials/admin-view.html',
			controller: 'AdminCtrl'
		});

		$routeProvider.otherwise({redirectTo: '/landing'});
	}]);

});
