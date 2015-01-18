'use strict';

define(['angular', 'app'], function(angular, app) {

	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/landing', {
			templateUrl: 'app/partials/landing.html',
			controller: 'LandingCtrl'
		});

		$routeProvider.otherwise({redirectTo: '/landing'});
	}]);

});
