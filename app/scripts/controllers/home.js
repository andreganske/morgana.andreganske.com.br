'use strict';

angular.module('myApp')

.controller('HomeController', ['$rootScope', '$scope', function($rootScope, $scope) {
	
	if ($rootScope.logged) {
		$scope.user = Parse.User.current().get('fullname');
	}

	new Countdown({
		selector: '#countdown',
		msgPattern: "Faltam {days} dias, {hours} horas, {minutes} minutos e {seconds} segundos!",
		dateEnd: new Date('Aug 15, 2015 20:00')
	});

}]);