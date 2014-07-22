require.config({
    shim: {
        'facebook' : {
            exports: 'fb'
        }
    },

    paths: {
        'facebook': '//connect.facebook.net/pt_BR/all'
    }
})

require(['fb']);

define(["jquery.min", "jquery.countdown.min", "bootstrap.min", "parse.min"], function (require) {

    Parse.initialize("co1z3OCpRS8Ue4JBeNRmWsvj2V48sfSym0kxbCmh", "JQSS4X7cFaqA9MWlu6K4pGmoN4mFzYC9SmfizSvU");

    main = new Object();

    $(function() {

        main = {

            bindings: {
                'fb-login' : ['click', 'dologin']
            },

            init: function () {
                this.doBindings();
            },

            doBindings: function() {
                var that = this;
                $.each(this.bindings, function(key, obj) {
                    var event = obj[0];
                    var callback = obj[1];
                    var bindName = "[data-" + key + "]"; 
                    $("body").off(event, bindName);
                    $("body").on(event, bindName, function(evt) {
                        that[callback].call(that, this, evt);
                    });
                });
            },

            dologin: function() {
                Parse.FacebookUtils.logIn(null, {
                    success: function(user) {
                        if (!user.existed()) {
                            alert("User signed up and logged in through Facebook!");
                        } else {
                            alert("User logged in through Facebook!");
                        }
                    },
                    error: function(user, error) {
                        alert("User cancelled the Facebook login or did not fully authorize.");
                    }
                });
            }
        };

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

    main.init();
    
});
