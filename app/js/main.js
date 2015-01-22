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
		countdown: 		"libs/countdown.min",
		uibootstrap: 	"libs/ui-bootstrap.min"
	},

	shim: {
		'angular' 			: { 'exports' : 'angular' },
		'angularRoute'		: [ 'angular' ],
		'angularAnimate'    : [ 'angular' ],
		'bootstrap'         : { deps:['jquery'] },
		'angularMocks'		: { deps:['angular'], 'exports':'angular.mock' },
		'uibootstrap'		: [ 'angular' ],
	},

	priority: [
		"angular"
	]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
	'angular',
	'app',
	'routes',
	'parse'
], function(angular, app, routes) {
	
	Parse.initialize("co1z3OCpRS8Ue4JBeNRmWsvj2V48sfSym0kxbCmh", "JQSS4X7cFaqA9MWlu6K4pGmoN4mFzYC9SmfizSvU");

	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
		angular.resumeBootstrap([app['name']]);
	});
});