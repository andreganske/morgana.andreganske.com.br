define(["jquery.min", "countdown.min"], function (require) {

    $(function() {
        var countdown = new Countdown({
            selector: '#countdown',
            msgPattern: "Faltam {months} meses, {days} dias, {hours} horas e {minutes} minutos!",
            dateEnd: new Date('Aug 15, 2015 20:00')
        });
    });
});
