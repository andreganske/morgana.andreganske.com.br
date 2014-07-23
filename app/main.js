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

define(["jquery.min", "countdown.min", "bootstrap.min", "parse.min"], function (require) {

    Parse.initialize("co1z3OCpRS8Ue4JBeNRmWsvj2V48sfSym0kxbCmh", "JQSS4X7cFaqA9MWlu6K4pGmoN4mFzYC9SmfizSvU");

    main = new Object();

    $(function() {
        
        new Countdown({
            selector: '#countdown',
            msgPattern: "Faltam {months} meses, {days} dias, {hours} horas e {minutes} minutos!",
            dateEnd: new Date('Aug 15, 2015 20:00')
        });

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
    });

    main.init();

});
