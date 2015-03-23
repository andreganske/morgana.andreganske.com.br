'use strict';

var myApp = angular.module('myApp', [
	'ngRoute',
	'ngAnimate',
	'ui.bootstrap',
	'ui.mask',
	'toaster',
	'angular-loading-bar',
	'ParseServices',
	'myApp.filters'
]);

myApp.config(function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl: 'app/scripts/views/home.html',
		controller: 'HomeController'
	});

	$routeProvider.when('/guest', {
		templateUrl: 'app/scripts/views/guest.html',
		controller: 'GuestController'
	});

	$routeProvider.when('/admin', {
		templateUrl: 'app/scripts/views/admin.html',
		controller: 'AdminController'
	});

	$routeProvider.otherwise({redirectTo: '/'});
})

.run(['ParseSDK', '$rootScope', '$location', function(ParseService, $rootScope, $location) {
	ParseService.getConfig();

	if ($rootScope.logged) {
		if ($rootScope.login == "admin@admin.com") {
			$location.path("/admin");
		} else {
			$location.path("/guest");
		}
	}
}]);