define(['jquery', 'countdown', 'myApp.services'], function (jquery, countdown, config) {

	new Countdown({
		selector: '#countdown',
		msgPattern: "Faltam {days} dias, {hours} horas, {minutes} minutos e {seconds} segundos!",
		dateEnd: new Date('Aug 15, 2015 20:00')
	});

	if (config.allowLogin) {
		console.log('allowLogin');
	};

	if (config.allowSigin) {
		console.log('allowSigin');
	};
	
	if (config.useAnalytics) {
		console.log('useAnalytics');
	};
});