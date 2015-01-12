define([ "jquery", "angular", "parse", "countdown.min", "bootstrap", "validator"], function() {

    Parse.initialize("co1z3OCpRS8Ue4JBeNRmWsvj2V48sfSym0kxbCmh", "JQSS4X7cFaqA9MWlu6K4pGmoN4mFzYC9SmfizSvU");

    new Countdown({
    	selector: '#countdown',
    	msgPattern: "Faltam {days} dias, {hours} horas, {minutes} minutos e {seconds} segundos!",
    	dateEnd: new Date('Aug 15, 2015 20:00')
    });

    $(function() {

    	var app = {

    		bindings: {
    			"do-login"		: ['click', 'doLogin'],
    			"do-signin"		: ['click', 'doSignin']
    		},

    		init: function() {
                this.loginControl();
    			this.doBindings();
    			this.passwordValidator();
    		},

    		doBindings: function() {
    			var that = this;
    			$.each(this.bindings, function(key, obj) {
    				var event = obj[0],
    					callback = obj[1],
    					bindName = '[data-' + key + ']';

    				$('body').off(event, bindName);
    				$('body').on(event, bindName, function(evt) {
    					that[callback].call(that, this, evt);
    				});
    			});
    		},

    		doLogin: function() {
    			$('#login-error').remove();

    			Parse.User.logIn($('#login-email').val(), $('#login-password').val(), {
    				success: function(retorno) {
    					//$rootScope.user = retorno;
    					//$mdDialog.hide();
    				},
    				error: function(user, error) {
    					if (error.code == 101) {
    						app.showAlert(1);
    					} else {
    						$('#error-undefined').alert();
    					}
    				}
    			});
    		},

    		doSignin: function() {
    			var newUser = new Parse.User();
    			newUser.set('username', $scope.user.username);
    			newUser.set('name', $scope.user.name);
    			newUser.set('email', $scope.user.email);
    			newUser.set('password',	$scope.user.password);

    			newUser.signUp (null, {
    				success: function(user) {
    					$rootScope.user = this.user;
    					$mdDialog.hide();
    				},
    				error: function(user, error) {
    					alert("Error: " + error.code + " " + error.message);
    				}
    			});
    		},

    		passwordValidator: function() {
    			$('#signin-form').bootstrapValidator( {
    				feedbackIcons: {
    					valid: 'glyphicon glyphicon-ok',
    					invalid: 'glyphicon glyphicon-remove',
    					validating: 'glyphicon glyphicon-refresh'
    				},
    				fields: {
    					confirmPassword: {
    						validators: {
    							identical: {
    								field: 'password',
    								message: 'As senhas digitadas não são iguais...'
    							}
    						}
    					}
    				}
    			});
    		},

    		showAlert: function(type) {
    			if (type == 1) {
    				$('#login-form').append('<div id="login-error" class="alert alert-info" role="alert"><strong>Ooops!</strong> Usuário ou senha incorretos. Não lembra a senha? <a href="#" class="alert-link">Clique aqui.</a></div>');
    			}
    		},

            loginControl: function() {
                var allow_login = false,
                    allow_singin = false;

                Parse.Config.get().then(function(config) {
                    allow_login = config.get("allow_login");
                    allow_singin = config.get("allow_singin");


                }, function(error) {
                    var config = Parse.Config.current();
                    allow_login = config.get("allow_login");
                    allow_singin = config.get("allow_singin");

                    if (allow_login === undefined) {
                        allow_login = false;
                    }

                    if (allow_singin === undefined) {
                        allow_singin = false;   
                    }
                });

                if (allow_login) {
                    $('#login-nav-bar').append('<li><a href="#" data-toggle="modal" data-target="#login-modal">Entrar</a></li>');        
                }

                if (allow_singin) {
                    $('#login-nav-bar').append('<li><a href="#" data-toggle="modal" data-target="#signin-modal">Registrar</a></li>');
                }
            }

        };

        app.init();

    });
});
