'use strict';

angular.module('ParseServices', [])

.factory('ParseSDK', function($rootScope, $location, $route) {

	Parse.initialize("co1z3OCpRS8Ue4JBeNRmWsvj2V48sfSym0kxbCmh", "JQSS4X7cFaqA9MWlu6K4pGmoN4mFzYC9SmfizSvU");

	var service = {
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
					if (error.code == 101) {
						$("#login-inputEmail").parent().toggleClass('has-error');
						$("#login-inputPass").parent().toggleClass('has-error');
						$('#loginError').show();
					} else {
						alert("Error: " + error.code + " " + error.message);
						$('#unknowError').show();
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

		getProducts: function() {
			var Product = Parse.Object.extend('Product');
			var query = new Parse.Query(Product);

			var promise = query.find({
				success: function(result) {
					$rootScope.products = result;
				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});

			return promise;
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
				
			guest.set('guest_name', 	$scope.fullname);
			guest.set('guest_email', 	$scope.email);
			guest.set('guest_phone', 	$scope.phone);
			guest.set('guest_delivery', $scope.delivery);
			guest.set('guest_product', 	$scope.item.id);
			
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
			product.set('category', 	$scope.category);
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

		editProduct: function(product) {
			var Product = Parse.Object.extend("Product");
			var query = new Parse.Query(Product);

			var promise = query.get(product.id, {
				success: function(data) {
					data.set('name', 		product.name);
					data.set('description', product.description);
					data.set('category', 	product.category);

					data.save();
				},
				error: function(object, error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});

			return promise;
		},

		deleteProduct: function(product) {
			var Product = Parse.Object.extend("Product");
			var query = new Parse.Query(Product);

			var promise = query.get(product.id, {
				success: function(data) {
					data.destroy({
						success: function(data) {

						},
						error: function(data, error) {
							alert("Error: " + error.code + " " + error.message);
						}
					});
				},
				error: function(object, error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});

			return promise;
		}
	};

	return service;

});