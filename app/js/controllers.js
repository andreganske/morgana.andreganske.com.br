'use strict';

define(['angular', 'services', 'jquery', 'countdown'], function(angular) {
	
	return angular.module('myApp.controllers', ['myApp.services'])
		.controller('LandingCtrl', ['$scope', function($scope) {
			new Countdown({
				selector: '#countdown',
				msgPattern: "Faltam {days} dias, {hours} horas, {minutes} minutos e {seconds} segundos!",
				dateEnd: new Date('Aug 15, 2015 20:00')
			});
		}]);
});
