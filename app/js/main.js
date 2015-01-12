'use strict';

require.config({
	paths: {
		angular: 		"//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular.min",
		angularRoute: 	"//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-route.min",
		angularMocks: 	"//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-mocks",
		angularAnimate: "//ajax.googleapis.com/ajax/libs/angularjs/1.3.8/angular-animate.min",
		jquery: 		"//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min",
		parse:          "//www.parsecdn.com/js/parse-1.3.3.min",
		bootstrap:      "//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min",
		validator:      "//cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.3/js/bootstrapValidator.min"
	},

	shim: {
		'angular' 			: { 'exports' : 'angular' },
		'angularRoute'		: [ 'angular' ],
		'angularAnimate'    : [ 'angular' ],
		'bootstrap'         : { deps:['jquery'] },
		'angularMocks'		: { deps:['angular'], 'exports':'angular.mock' }
	},

	priority: [
		"angular"
	]
});

window.name = "NG_DEFER_BOOTSTRAP!";

require( [
	'angular',
	'app',
	'routes'
], function(angular, app, routes) {
	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
		angular.resumeBootstrap([app['name']]);
	});
});
