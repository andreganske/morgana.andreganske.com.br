'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'angular-loading-bar', 'ParseServices']);

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

	var params = {};
	var _this = this;

	var promise = Parse.Config.get().then(function(config) {
		params.allowLogin = config.get("allow_login");
		params.allowSingin = config.get("allow_singin");
		params.useAnalytics = config.get("use_analytics");
	}, function(error) {
		Parse.Analytics.track('error', { code: '' + error.code });
		var config = Parse.Config.current();
		if (config === undefined) {
			params.allowLogin = false;
			params.allowSingin = false;
			params.useAnalytics = false;
		} else {
			params.allowLogin = config.get("allowLogin");
			params.allowSingin = config.get("allowSingin");
			params.useAnalytics = config.get("useAnalytics");
		}
	});

	promise.done(function() {
		$rootScope.allowLogin = params.allowLogin ? true : false;
		$rootScope.allowSingin = params.allowSingin ? true : false;
		$rootScope.useAnalytics = params.useAnalytics ? true : false;
	});
	
}]);