requirejs.config({
	
	paths: {
		"jquery": "lib/jquery-2.1.1.min",
		"jquery.bootstrap" : "lib/bootstrap.min",
		"angular": "js/angular.min.js",
		"underscore" : "underscore.js",
		"parse" : "js/parse-1.2.19.min.js"
	},

	shim: {
		"jquery.bootstrap": {
			deps: ["jquery"]
		},
		angular: {
			exports: 'angular'
		}
	}
});

require(['app'], function (app) {
	app.init();
});