'use strict';

angular.module('ParseServices', ['toaster'])

.factory('ParseSDK', function($rootScope, $location, $route, toaster) {

	Parse.initialize("co1z3OCpRS8Ue4JBeNRmWsvj2V48sfSym0kxbCmh", "JQSS4X7cFaqA9MWlu6K4pGmoN4mFzYC9SmfizSvU");

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
			}, function(error) {
				Parse.Analytics.track('error', { code: '' + error.code });
				var config = Parse.Config.current();
				if (config === undefined) {
					params.allowLogin = false;
					params.allowSingin = false;
					params.useAnalytics = false;
				} else {
					params.allowLogin = config.get("allowLogin");
					params.allowSingin = config.get("allowSingin");
					params.useAnalytics = config.get("useAnalytics");
				}
			});

			promise.done(function() {
				$rootScope.allowLogin = params.allowLogin ? true : false;
				$rootScope.allowSingin = params.allowSingin ? true : false;
				$rootScope.useAnalytics = params.useAnalytics ? true : false;

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
			if ($rootScope.logged) {
				if ($rootScope.isAdmin) {
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

		getProducts: function() {
			var _this = this,
				query = new Parse.Query(Parse.Object.extend('Product'));

			$rootScope.products = [];

			var promise = query.find({
				success: function(result) {
					$.each(result, function(key, value) {
						var product = {};

						product.id 				= value.id;
						product.name 			= value.get('name');
						product.description 	= value.get('description');
						product.category 		= _this.getCategory(value.get('category'));
						product.available 		= value.get('available');
						product.availableTxt 	= value.get('available') ? 'Disponível' : 'Reservado';

						$rootScope.products.push(product);
					});
				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});

			return promise;
		},

		getGuests: function() {
			var _this = this,
				query = new Parse.Query(Parse.Object.extend('Guest'));

			$rootScope.guests = [];

			return query.find({
				success: function(result) {
					$.each(result, function(key, value) {
						var guest = {};

						guest.id 		= value.id;
						guest.name 		= value.get('name');
						guest.email 	= value.get('email');
						guest.phone 	= value.get('phone');
						guest.delivery 	= value.get('delivery') === 'personal' ? 'Pessoalmente' : 'Via correio';

						$rootScope.guests.push(guest);
					});
				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);	
				}
			});
		},

		setProductNotAvailable: function(item) {
			var Product = Parse.Object.extend("Product");
			var query = new Parse.Query(Product);

			query.get(item.id, {
				success: function(item) {
					item.set('available', false);
					return item.save();
				},
				error: function(object, error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});
		},

		saveGuest: function($scope) {
			var Guest = Parse.Object.extend("Guest");
			var guest = new Guest(),
				_this = this;
				
			guest.set('name', 	  $scope.name);
			guest.set('email', 	  $scope.email);
			guest.set('phone', 	  $scope.phone);
			guest.set('delivery', $scope.delivery);
			guest.set('product',  $scope.item.id);
			
			var promise = guest.save(null, {
				success: function(guest) {
					_this.setProductNotAvailable($scope.item);
				},
				error: function(guest, error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});

			return promise;
		},

		createProduct: function($scope) {
			var Product = Parse.Object.extend("Product");
			var product = new Product(),
				_this = this;
				
			product.set('name', 		$scope.name);
			product.set('description', 	$scope.description);
			product.set('category', 	$scope.category.name);
			product.set('available', 	true);
			
			var promise = product.save(null, {
				success: function(product) {
					
				},
				error: function(product, error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});

			return promise;
		},

		editProduct: function($scope) {
			var Product = Parse.Object.extend("Product");
			var query = new Parse.Query(Product);

			var promise = query.get($scope.selection[0].id, {
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

			return promise;
		},

		deleteProduct: function($scope) {
			return Parse.Object.destroyAll($scope.selection).then(function(success) {},
				function(error) {
					alert("Error: " + error.code + " " + error.message);
				});
		}
	};

	return service;

});