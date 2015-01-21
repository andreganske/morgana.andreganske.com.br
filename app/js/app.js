'use strict';

define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
	], function (angular, filters, services, directives, controllers) {

		return angular.module('myApp', [
			'ngRoute',
			'myApp.filters',
			'myApp.services',
			'myApp.directives',
			'myApp.controllers'
		]);

		/*var app = angular.module('myApp', [
			'ngRoute',
			'myApp.controllers'
		], function() {
			var config  = Parse.Config.get().then(function(config) {

				$scope.allowLogin = config.get("allow_login");
				$scope.allowSingin = config.get("allow_singin");
				$scope.useAnalytics = config.get("use_analytics");

			}, function(error) {
				var config = Parse.Config.current();

				Parse.Analytics.track('error', { code: '' + error.code });

				if (config === undefined) {
					$scope.allowLogin = false;
					$scope.allowSingin = false;
					$scope.useAnalytics = false;
				} else {
					$scope.allowLogin = config.get("allowLogin");
					$scope.allowSingin = config.get("allowSingin");
					$scope.useAnalytics = config.get("useAnalytics");
				}
			});

			var currentUser = Parse.User.current();
			$scope.allowSingout = currentUser ? true : false;
		});

		return app;*/
});
