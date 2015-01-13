'use strict';

define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
	], function (angular, filters, services, directives, controllers) {

		var app = angular.module('myApp', [
			'ngRoute',
			'myApp.filters',
			'myApp.services',
			'myApp.directives',
			'myApp.controllers'
		]);

		app.controller('servicesctrl', ['$scope', function($scope, globalConstant, globalConfig) {
			var config  = Parse.Config.get().then(function(config) {
				var globalConfig = {};

				globalConfig.allowLogin = config.get("allow_login");
				globalConfig.allowSingin = config.get("allow_singin");
				globalConfig.useAnalytics = config.get("use_analytics");

				return globalConfig;
				
			}, function(error) {
				var config = Parse.Config.current(),
					globalConfig = {};

				Parse.Analytics.track('error', { code: '' + error.code });

				if (config === undefined) {
					globalConfig.allowLogin = false;
					globalConfig.allowSingin = false;
					globalConfig.useAnalytics = false;
				} else {
					globalConfig.allowLogin = config.get("allowLogin");
					globalConfig.allowSingin = config.get("allowSingin");
					globalConfig.useAnalytics = config.get("useAnalytics");
				}
				return globalConfig;
			});

			$scope.allowLogin = globalConfig.allowLogin;
			$scope.allowSingin = globalConfig.allowSingin;
			$scope.useAnalytics = globalConfig.useAnalytics;

			$scope.appName = config.name;
			$scope.appVersion = config.version;
		}]);

		return app;
});
