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
		templateUrl : 'app/scripts/views/home.html'
	});

	$routeProvider.when('/contact', {
		templateUrl : 'app/scripts/views/contact.html'
	});

	$routeProvider.otherwise({redirectTo: '/'});
})

.run(['ParseSDK', '$rootScope', function(ParseService, $rootScope) {
	ParseService.getConfig();
}]);