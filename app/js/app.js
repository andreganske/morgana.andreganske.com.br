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
				globalConfig.allowSigin = config.get("allow_sigin");
				globalConfig.useAnalytics = config.get("use_analytics");

				return globalConfig;
			}, function(error) {
				var codeString = '' + error.code;
				Parse.Analytics.track('error', { code: codeString });
				return Parse.Config.current();
			});

			if (config === undefined) {
				globalConfig.allowLogin = false;
				globalConfig.allowSigin = false;
				globalConfig.useAnalytics = false;
			} else {
				globalConfig.allowLogin = config.get("allow_login");
				globalConfig.allowSigin = config.get("allow_sigin");
				globalConfig.useAnalytics = config.get("use_analytics");
			}

			$scope.allowLogin = globalConfig.allowLogin;
			$scope.allowSigin = globalConfig.allowSigin;
			$scope.useAnalytics = globalConfig.useAnalytics;

			$scope.appName = config.name;
			$scope.appVersion = config.version;
		}]);

		return app;
});
