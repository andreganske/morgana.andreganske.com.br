'use strict';

var app = angular.module('myApp', [
			'ngRoute',
			'myApp.filters',
			'myApp.services',
			'myApp.directives',
			'myApp.controllers',
			'angular-loading-bar'
		]);

app.config(['$routeProvider', function($routeProvider) {

	Parse.initialize("co1z3OCpRS8Ue4JBeNRmWsvj2V48sfSym0kxbCmh", "JQSS4X7cFaqA9MWlu6K4pGmoN4mFzYC9SmfizSvU");

	getConfigFromServer();

	$routeProvider.when('/', {
		templateUrl: 'app/pages/landing.html',
		controller: 'LandingCtrl'
	});

	$routeProvider.when('/guest', {
		templateUrl: 'app/pages/guest-view.html',
		controller: 'GuestCtrl'
	});

	$routeProvider.when('/admin', {
		templateUrl: 'app/pages/admin-view.html',
		controller: 'AdminCtrl'
	});

	$routeProvider.otherwise({redirectTo: '/'});
}]);

function getConfigFromServer() {
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
		_this.allowLogin = params.allowLogin ? true : false;
		_this.allowSingin = params.allowSingin ? true : false;
		_this.useAnalytics = params.useAnalytics ? true : false;
	});
};