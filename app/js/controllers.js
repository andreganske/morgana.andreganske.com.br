'use strict';

define(['angular', 'services', 'jquery', 'countdown'], function(angular) {

	var app = angular.module('myApp.controllers', ['myApp.services']);

	app.controller('LandingCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
		new Countdown({
			selector: '#countdown',
			msgPattern: "Faltam {days} dias, {hours} horas, {minutes} minutos e {seconds} segundos!",
			dateEnd: new Date('Aug 15, 2015 20:00')
		});
	}]);

	app.controller('HeaderCtrl', ['$rootScope', function($rootScope) {

	}]);

	return app;
});
