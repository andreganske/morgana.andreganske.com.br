'use strict';

define(['angular', 'services', 'jquery', 'countdown'], function (angular) {
	
	return angular.module('myApp.controllers', ['myApp.services'])
		// Sample controller where service is being used
		//.controller('MyCtrl1', ['$scope', function ($scope) {}])

		// Landing controller
		.controller('LandingCtrl', ['$scope', '$injector', function ($scope, $injector) {
			new Countdown({
				selector: '#countdown',
				msgPattern: "Faltam {days} dias, {hours} horas, {minutes} minutos e {seconds} segundos!",
				dateEnd: new Date('Aug 15, 2015 20:00')
			});
		}]);
});
