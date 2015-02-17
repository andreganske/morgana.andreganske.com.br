'use strict';

var myApp = angular.module('myApp', [
	'ngRoute',
	'ui.bootstrap',
	'angular-loading-bar',
	'ParseServices',
	'myApp.filters'
]);

myApp.config(function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl: 'app/scripts/views/home.html',
		controller: 'HomeController'
	});

	$routeProvider.when('/contact', {
		templateUrl: 'app/scripts/views/contact.html'
	});

	$routeProvider.when('/guest', {
		templateUrl: 'app/scripts/views/guest.html',
		controller: 'GuestController'
	});

	$routeProvider.otherwise({redirectTo: '/'});
})

.run(['ParseSDK', '$rootScope', '$location', function(ParseService, $rootScope, $location) {
	ParseService.getConfig();

	if ($rootScope.logged) {
		$location.path("guest");
	};
}]);