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

			if ($rootScope.allowLogin) {
				console.log('allowLogin');
			}

			if ($rootScope.allowSingin) {
				console.log('allowSingin');
			}

			if ($rootScope.useAnalytics) {
				console.log('useAnalytics');
			}
		};
	}]);

});
