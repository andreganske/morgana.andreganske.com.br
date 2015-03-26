'use strict';

var myApp = angular.module('myApp', [
	'ngRoute',
	'ui.mask',
	'toaster',
	'angular-loading-bar',
	'myApp.directives',
	'myApp.filters',
	'ParseServices',
	'ui.bootstrap',
	'ngAnimate'
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
});

myApp.run(['ParseSDK', '$rootScope', '$location', function(ParseService, $rootScope, $location) {
	ParseService.getConfig();

	if ($rootScope.logged) {
		if ($rootScope.isAdmin) {
			$location.path("/admin");
		} else {
			$location.path("/guest");
		}
	}
}]);