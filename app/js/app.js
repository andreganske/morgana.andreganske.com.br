'use strict';

var allowLogin,
	allowSigin,
	useAnalytics;

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
			var that = this;
			Parse.Config.get().then(function(config) {
				that.allowLogin = config.get("allow_login");
				that.allowSigin = config.get("allow_sigin");
				that.useAnalytics = config.get("use_analytics");
			}, function(error) {
				var codeString = '' + error.code;
				Parse.Analytics.track('error', { code: codeString });
				var config = Parse.Config.current();

				if (config === undefined) {
					globalConfig.allowLogin = false;
					globalConfig.allowSigin = false;
					globalConfig.useAnalytics = false;
				} else {
					globalConfig.allowLogin = config.get("allowLogin");
					globalConfig.allowSigin = config.get("allowSigin");
					globalConfig.useAnalytics = config.get("useAnalytics");
				}
			});

			globalConfig.allowLogin = this.allowLogin;
			globalConfig.allowSigin = this.allowSigin;
			globalConfig.useAnalytics = this.useAnalytics;

			$scope.allowLogin = globalConfig.allowLogin;
			$scope.allowSigin = globalConfig.allowSigin;
			$scope.useAnalytics = globalConfig.useAnalytics;

			$scope.appName = config.name;
			$scope.appVersion = config.version;
		}]);

		return app;
});
