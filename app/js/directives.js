'use strict';

define(['angular', 'services'], function(angular, services) {

	/* Directives */
	
	var dir = angular.module('myApp.directives', ['myApp.services']);
	
	dir.directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}]);

	dir.directive('propertiesValidation', ['$rootScope', function($rootScope) {
		return function(scope, elm, attrs) {

			var params = {};

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
				var currentUser = Parse.User.current();

				$rootScope.allowSingout = currentUser ? true : false;
				$rootScope.allowLogin = params.allowLogin ? true : false;
				$rootScope.allowSingin = params.allowSingin ? true : false;
				$rootScope.useAnalytics = params.useAnalytics ? true : false;

				if ($rootScope.allowSingout) {					
					$('#header_menu').append('<li><a href="#" ng-click="" ng-show="allowSingout">Sair</a></li>');
				} else {
					if ($rootScope.allowLogin) {
						$('#header_menu').append('<li><a href="#" ng-click="" ng-show="allowLogin">Entrar</a></li>');
					}

					if ($rootScope.allowSingin) {
						$('#header_menu').append('<li><a href="#" ng-click="" ng-show="allowSingin">Nova conta</a></li>');
					}
				}

				if ($rootScope.useAnalytics) {
					// do something;
				}
			});
		};
	}]);

});
