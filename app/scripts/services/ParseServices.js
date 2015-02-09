'use strict';

angular.module('ParseServices', [])

.factory('ParseSDK', function($rootScope) {

	Parse.initialize("co1z3OCpRS8Ue4JBeNRmWsvj2V48sfSym0kxbCmh", "JQSS4X7cFaqA9MWlu6K4pGmoN4mFzYC9SmfizSvU");

	var service = {
		getConfig: function() {
			
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
		}
	};

	return service;

});