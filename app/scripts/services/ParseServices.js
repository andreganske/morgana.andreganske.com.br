'use strict';

angular.module('ParseServices', ['toaster'])

.factory('ParseSDK', function($rootScope, $location, $route, toaster) {

	//Parse.initialize("co1z3OCpRS8Ue4JBeNRmWsvj2V48sfSym0kxbCmh", "JQSS4X7cFaqA9MWlu6K4pGmoN4mFzYC9SmfizSvU");
	Parse.initialize("HEILUzQUUjtAwjJcjO9wVpCHeEaPVpYJzEmDybgx", "71vRVduGDwNKeBwV0jt4a8iKP7rm1F0Crej2xPqu");

	var service = {

		categories: [
			{ name: 'eletro', 		description: 'Eletro eletronicos'},
			{ name: 'kitchen', 		description: 'Cozinha'},
			{ name: 'utilities', 	description: 'Cama, mesa e banho'},
			{ name: 'decor', 		description: 'Decoração'},
			{ name: 'others', 		description: 'Outros'},
		],

		getConfig: function() {
			var params = {};
			var _this = this;

			var promise = Parse.Config.get().then(function(config) {
				params.allowLogin = config.get("allow_login");
				params.allowSingin = config.get("allow_singin");
				params.useAnalytics = config.get("use_analytics");
				params.sendEmail = config.get("send_email");
			}, function(error) {
				Parse.Analytics.track('error', { code: '' + error.code });
				var config = Parse.Config.current();
				if (config === undefined) {
					params.allowLogin = false;
					params.allowSingin = false;
					params.useAnalytics = false;
					params.sendEmail = false;
				} else {
					params.allowLogin = config.get("allowLogin");
					params.allowSingin = config.get("allowSingin");
					params.useAnalytics = config.get("useAnalytics");
					params.sendEmail = config.get("send_email");
				}
			});

			promise.done(function() {
				$rootScope.allowLogin = params.allowLogin ? true : false;
				$rootScope.allowSingin = params.allowSingin ? true : false;
				$rootScope.useAnalytics = params.useAnalytics ? true : false;
				$rootScope.sendEmail = params.sendEmail ? true : false;

				var currentUser = Parse.User.current();
				if (currentUser != undefined) {
					$rootScope.logged = true;
					$rootScope.user = currentUser.get('fullname');
					$rootScope.login = currentUser.get('username');
					$rootScope.isAdmin = currentUser.get('isAdmin');
				} else {
					$rootScope.logged = false;
				}
			});
		},

		validateLoggedUser: function() {
			var currentUser = Parse.User.current();
			if (currentUser != undefined) {
				if (currentUser.get('isAdmin')) {
					$location.path("/admin");
				} else {
					$location.path("/guest");
				}
			}
		},

		login: function($scope) {
			return Parse.User.logIn($scope.email, $scope.password, {
				success: function(currentUser) {
					$rootScope.logged = true;
					$rootScope.user = currentUser.get('fullname');
					$rootScope.login = currentUser.get('username');
					$rootScope.isAdmin = currentUser.get('isAdmin');
				},
				error: function(user, error) {
					if ([101, 200, 201].indexOf(error.code) > -1) {
						$("#login-inputEmail").parent().toggleClass('has-error');
						$("#login-inputPass").parent().toggleClass('has-error');
						toaster.pop('error', "Oooops", "O login ou a senha digitados estão incorretos. Por favor, verifique e tente novamente :)", 5000);
					} else {
						toaster.pop('error', "Oooops", "Houve um erro desconhecido. Por favor, tente novamente mais tarde :D", 5000);
					}
				}
			});
		},

		logout: function() {
			Parse.User.logOut();
			$rootScope.logged = false;
			$rootScope.user = '';
			$rootScope.login = '';
			$location.path('/');
			$route.reload();
		},

		getCategory: function(name) {
			var _this = this,
				result;
			$.each(_this.categories, function(key, value) {
				if (value.name === name) {
					result = value;
				}
			});
			return result;
		},

		getProducts: function($scope) {
			var _this = this,
				query = new Parse.Query(Parse.Object.extend('Product'));

			$scope.products = [];

			return query.find({
				success: function(result) {
					$.each(result, function(key, value) {
						var product = {};

						product.id 				= value.id;
						product.name 			= value.get('name');
						product.description 	= value.get('description');
						product.category 		= _this.getCategory(value.get('category'));
						product.available 		= value.get('available');
						product.availableTxt 	= value.get('available') ? 'Disponível' : 'Reservado';

						$scope.products.push(product);
					});
				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});
		},

		getGuests: function($scope) {
			var _this = this,
				query = new Parse.Query(Parse.Object.extend('Guest'));

			$scope.guests = [];

			return query.find({
				success: function(result) {
					$.each(result, function(key, value) {
						var guest = {};

						guest.id 		= value.id;
						guest.name 		= value.get('name');
						guest.email 	= value.get('email');
						guest.phone 	= value.get('phone');
						guest.delivery 	= value.get('delivery') === 'personal' ? 'Pessoalmente' : 'Via correio';

						$scope.guests.push(guest);
					});
				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);	
				}
			});
		},

		saveGuest: function($scope, $modal, toaster) {
			var _this = this,
				Gift = Parse.Object.extend("Product");

			new Parse.Query(Gift).get($scope.item.id, {
				success: function(item) {
					var guest = new (Parse.Object.extend("Guest"));
						
					guest.set('name', 	  $scope.name);
					guest.set('email', 	  $scope.email);
					guest.set('phone', 	  $scope.phone);
					guest.set('delivery', $scope.delivery);
					
					item.set('available', false);
					item.set("guest", guest);

					item.save().done(function() {
						var text = "Obrigado " + $scope.name + ". Agradecemos pelo carinho e até o casamento! ";
						toaster.pop('success', "Presente confirmado!", text, 10000);
						_this.sendConfirmationEmail($scope);
						$modal.close();
					});
				},
				error: function(object, error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});
		},

		createProduct: function($scope, $modalInstance, toaster) {
			var Product = Parse.Object.extend("Product");
			var product = new Product(),
				_this = this;
				
			product.set('name', 		$scope.name);
			product.set('description', 	$scope.description);
			product.set('category', 	$scope.category.name);
			product.set('available', 	true);
			
			return product.save(null, {
				success: function(product) {
					var text = $scope.name + " adicionado a lista de casamento!";
					toaster.pop('success', "Novo presente cadastrado!", text, 5000);
					if ($modalInstance) {
						$modalInstance.close();
					}
				},
				error: function(product, error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});
		},

		editProduct: function($scope) {
			var Product = Parse.Object.extend("Product");
			var query = new Parse.Query(Product);

			return query.get($scope.selection[0].id, {
				success: function(data) {
					data.set('name', 		$scope.name);
					data.set('description', $scope.description);
					data.set('category', 	$scope.category.name);

					data.save();
				},
				error: function(object, error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});
		},

		deleteProduct: function($scope, toaster) {
			var Product = Parse.Object.extend("Product");
			var query = new Parse.Query(Product);

			$.each($scope.selection, function(key, value) {
				query.get(value.id, {
					success: function(data) {
						data.destroy({
							success: function(object) {
								var text = "O presentes " + object.get('name') + " foi removido com sucesso da lista de casamento!";
								toaster.pop('success', "Presente removido", text, 2000);
							},
							error: function(object, error) {
								alert("Error: " + error.code + " " + error.message);		
							}
						});
					},
					error: function(object, error) {
						alert("Error: " + error.code + " " + error.message);
					}
				});
			});
		},

		sendConfirmationEmail: function($scope) {
			if ($rootScope.sendEmail) {
				Parse.Cloud.run('sendConfirmationEmail', {email: $scope.email, name: $scope.name, gift: $scope.item.name}, {
					success: function(result) {
						var text = "Email de confirmação enviado com sucesso!";
						toaster.pop('success', "Email enviado", text, 5000);
					},
					error: function(error) {
						alert("Error: " + error.code + " " + error.message);
					}
				});
			}
		},

		setCounters: function($scope) {
			this.countGuests($scope);
			this.countProduct($scope);
		},

		countGuests: function($scope) {
			var query = new Parse.Query(Parse.Object.extend('Guest'));
			query.count({
				success: function(count) {
					$scope.count_guest = count;
				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});
		},

		countProduct: function($scope) {
			var query = new Parse.Query(Parse.Object.extend('Product'));
			query.exists("guest");
			query.count({
				success: function(count) {
					$scope.count_gifts = count;
				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});
		}
	};

	return service;

});