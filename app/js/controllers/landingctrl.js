define(['jquery', 'countdown', 'services'], function () {

	new Countdown({
		selector: '#countdown',
		msgPattern: "Faltam {days} dias, {hours} horas, {minutes} minutos e {seconds} segundos!",
		dateEnd: new Date('Aug 15, 2015 20:00')
	});

	if (globalConfig.allowLogin) {
		console.log('allowLogin');
	};

	if (globalConfig.allowSingin) {
		console.log('allowSingin');
	};
	
	if (globalConfig.useAnalytics) {
		console.log('useAnalytics');
	};
});