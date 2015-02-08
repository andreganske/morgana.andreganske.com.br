'use strict';

define(['angular', 'services'], function (angular, services) {

	/* Filters */
	
	var app = angular.module('myApp.filters', ['myApp.services']);

	app.filter('interpolate', ['version', function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	}]);

	app.filter('unique', function() {
		return function(collection, keyname) {
			var output = [],
				keys = [];

			angular.forEach(collection, function(item) {
				var key = item[keyname];
				if (keys.indexOf(key) === -1) {
					keys.push(key);
					output.push(item);
				}
			});
			return output;
		};
	});

	app.filter('category', function() {
		return function(collection, category) {
			var output = [];

			angular.forEach(collection, function(item) {
				if (item.category === category) {
					output.push(item);
				}
			});
			return output;
		};
	});

});
