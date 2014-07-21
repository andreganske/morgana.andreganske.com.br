define(["jquery.min", "jquery.countdown.min"], function (require) {
    // Load any app-specific modules
    // with a relative require call,
    // like:
    /*var messages = require('./messages'),
    	count = require('./countdown');


    // Load library/vendor modules using
    // full IDs, like:
    var print = require('print');

    print(messages.getHello());

    count.getTime();*/

    $(function() {

    	$('#countdown').countdown('2015/08/15 20:00:00', function (event) {
    		var months = event.strftime('%m'),
    			days = event.strftime('%d'),
    			hours = event.strftime('%H'),
    			min = event.strftime('%M'),
    			string = 'Faltam ';

    		if (months === 1) {
    			string += months + ' mes, ';
    		} else {
    			string += months + ' meses, ';
    		}

    		if (days === 1) {
    			string += days + ' dia, ';
    		} else {
    			string += days + ' dias, ';
    		}

			if (hours === 1) {
    			string += hours + ' hora e ';
    		} else {
    			string += hours + ' horas e ';
    		}

			if (min === 1) {
    			string += min + ' minuto ';
    		} else {
    			string += min + ' minutos ';
    		}

    		$(this).html(string);
    	});
    });

});
