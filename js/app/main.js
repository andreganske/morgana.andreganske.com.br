define(["jquery", "parse", "countdown.min", "bootstrap"], function() {

    Parse.initialize("co1z3OCpRS8Ue4JBeNRmWsvj2V48sfSym0kxbCmh", "JQSS4X7cFaqA9MWlu6K4pGmoN4mFzYC9SmfizSvU");

    new Countdown({
    	selector: '#countdown',
    	msgPattern: "Faltam {days} dias, {hours} horas, {minutes} minutos e {seconds} segundos!",
    	dateEnd: new Date('Aug 15, 2015 20:00')
    });

});
