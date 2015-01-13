'use strict';

define(['angular'], function (angular) {
	
	angular.module('myApp.services', []).constant('globalConstant', {
		name: 		'Morgana e Andre',
		version: 	'0.1'
	}).value('globalConfig', {
		allowLogin, 	true,
		allowSigin, 	true,
		useAnalytics, 	true
	}).controller('servicesctrl', function(globalConstant, globalConfig) {

		Parse.Config.get().then(function(config) {

			globalConfig.allowLogin = config.allowLogin;
			globalConfig.allowSigin = config.allowSigin;
			globalConfig.useAnalytics = config.useAnalytics;

		}, function(error) {
			var codeString = '' + error.code;
			Parse.Analytics.track('error', { code: codeString });

			var config = Parse.Config.current();

			if (config === undefined) {
				globalConfig.allowLogin = false;
				globalConfig.allowSigin = false;
				globalConfig.useAnalytics = false;
			} else {
				globalConfig.allowLogin = config.allowLogin;
				globalConfig.allowSigin = config.allowSigin;
				globalConfig.useAnalytics = config.useAnalytics;
			}

		});
	});

});
