define(['jquery', 'countdown'], function() {

	return ['$scope', '$http', function ($scope, $http) {

		new Countdown({
			selector: '#countdown',
			msgPattern: "Faltam {days} dias, {hours} horas, {minutes} minutos e {seconds} segundos!",
			dateEnd: new Date('Aug 15, 2015 20:00')
		});

		// its an async, so we missed Angular's initial call
		// to $apply
		$scope.$apply();
	}];

});