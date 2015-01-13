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
		], function(globalConstant, globalConfig) {
			var config  = Parse.Config.get().then(function(config) {
				var global = {};

				global.allowLogin = config.get("allow_login");
				global.allowSingin = config.get("allow_singin");
				global.useAnalytics = config.get("use_analytics");

				return global;

			}, function(error) {
				var config = Parse.Config.current(),
					global = {};

				Parse.Analytics.track('error', { code: '' + error.code });

				if (config === undefined) {
					global.allowLogin = false;
					global.allowSingin = false;
					global.useAnalytics = false;
				} else {
					global.allowLogin = config.get("allowLogin");
					global.allowSingin = config.get("allowSingin");
					global.useAnalytics = config.get("useAnalytics");
				}
				return global;
			});

			if (global != undefined) {
				globalConfig.allowLogin = config.allowLogin;
				globalConfig.allowSingin = config.allowSingin;
				globalConfig.useAnalytics = config.useAnalytics;
			}

		});

		return app;
});
