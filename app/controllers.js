'use strict';

var app = angular.module('myApp.controllers', ['myApp.services', 'ui.bootstrap']);

app.controller('LandingCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
	var currentUser = Parse.User.current();
	$scope.logged = currentUser ? true : false;
	if ($scope.logged) {
		$scope.user = currentUser.get('fullname');
	}

	new Countdown({
		selector: '#countdown',
		msgPattern: "Faltam {days} dias, {hours} horas, {minutes} minutos e {seconds} segundos!",
		dateEnd: new Date('Aug 15, 2015 20:00')
	});
}]);

app.controller('AdminCtrl', ['$scope', '$location', function($scope, $location) {
	validateLoggedUser($scope, $location);

	$scope.master = {};

	$scope.categories = [];
	$scope.products = [];

	getCategories($scope);

	$scope.save = function(gift) {
		createProduct(gift);
	};

	$scope.productList = function(category) {
		getProductsByCategory($scope, category);
	};

}]);

app.controller('GuestCtrl', ['$scope', '$location', function($scope, $location) {
	validateLoggedUser($scope, $location);

}]);

app.controller('LoginModalCtrl', ['$rootScope', '$scope', '$modal', '$location', function($rootScope, $scope, $modal, $location) {

	 $scope.init = function() {
		$scope.allowLogin = $rootScope.allowLogin;
		$scope.allowSingin = $rootScope.allowSingin;

		var currentUser = Parse.User.current();
		$scope.logged = currentUser ? true : false;
	};

	$scope.open = function(modal, size) {
		var modalInstance = $modal.open({
			templateUrl: modal + '.html',
			controller: 'ModalInstanceCtrl',
			size: size
		});

		modalInstance.result.then(function () {
			var currentUser = Parse.User.current();
			$scope.logged = currentUser ? true : false;
			$scope.user = currentUser.get('fullname');
			
			if ($scope.user === 'admin') {
				$location.path('/admin');
			} else {
				$location.path('/guest');
			}
		});
	};

	$scope.logoff = function() {
		Parse.User.logOut();
		$location.path('/');
	};
}]);

app.controller('ModalInstanceCtrl', function($scope, $modalInstance) {

	$scope.login = function () {
		Parse.User.logIn($scope.email, $scope.password, {
			success: function(retorno) {
				$modalInstance.close();
			},
			error: function(user, error) {
				if (error.code == 101) {
					//app.showAlert(1);
				} else {
					//$('#error-undefined').alert();
				}
			}
		});
	};

	$scope.create = function () {
		var newUser = new Parse.User();

		newUser.set('username', $scope.email);
		newUser.set('email', $scope.email);
		newUser.set('password',	$scope.password);
		newUser.set('fullname', $scope.fullname);

		newUser.signUp (null, {
			success: function(user) {
				$modalInstance.close();
			},
			error: function(user, error) {
				//$scope.alerts.push({type: 'danger', msg: "Error: " + error.code + " " + error.message});
				alert("Error: " + error.code + " " + error.message);
			}
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});

function validateLoggedUser($scope, $location) {
	var currentUser = Parse.User.current();
	$scope.logged = currentUser ? true : false;
	if ($scope.logged) {
		$scope.user = currentUser.get('fullname');
	} else {
		$location.path('/');
	}
};

function createProduct(gift) {
	var Product = Parse.Object.extend('Product');
	var product = new Product();

	product.set('category', gift.category);
	product.set('name', gift.product);
	product.set('available', true);

	product.save(null, {
		success: function(product) {
			alert('New object created with objectId: ' + product.id);
		},
		error: function(product, error) {
			alert('Failed to create new object, with error code: ' + error.message);
		}
	});
};

function getProductsByCategory($scope, category) {
	var Product = Parse.Object.extend('Product');
	var query = new Parse.Query(Product);

	query.equalTo("category", category);
	query.find({
		success: function(result) {
			$scope.products = [];
			
			for (var i = result.length - 1; i >= 0; i--) {
				var obj = {name: '', available: ''};
				obj.name = result[i].get('name');
				obj.available = result[i].get('available');
				$scope.products.push(obj);
			};
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});	
};

function getCategories($scope) {
	var Product = Parse.Object.extend('Product');
	var query = new Parse.Query(Product);

	query.find({
		success: function(result) {
			for (var i = result.length - 1; i >= 0; i--) {
				var obj = {name: ''};
				obj.name = result[i].get('category');
				$scope.categories.push(obj);
			};
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
};