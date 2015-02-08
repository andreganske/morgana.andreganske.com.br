'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'angular-loading-bar']);

myApp.config(function($routeProvider) {

	$routeProvider.when('/', {
		templateUrl : 'app/scripts/views/home.html'
	});

	$routeProvider.when('/contact', {
		templateUrl : 'app/scripts/views/contact.html'
	});

	$routeProvider.otherwise({redirectTo: '/'});

});