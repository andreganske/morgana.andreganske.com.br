'use strict';

angular.module('myApp')

.controller('GuestController', ['$rootScope', '$scope', 'ParseSDK', '$modal', function($rootScope, $scope, ParseService, $modal) {
	
	if ($rootScope.logged) {
		$scope.user = Parse.User.current().get('fullname');
	}

	var promise = ParseService.getProducts();

	promise.done(function() {
		for (var i = $rootScope.products.length - 1; i >= 0; i--) {
			var product = {name: '', description: '', category: '', available: ''},
				obj = $rootScope.products[i];
			
			product.name = obj.get('name');
			product.description = obj.get('description');
			product.category = obj.get('category');
			product.available = obj.get('available');
			
			$scope.products.push(product);
		};
	});

	$scope.selectItem = function() {
		var modalInstance = $modal.open({
			templateUrl: 'selectItem.html',
			controller: 'ModalController'
		});

		modalInstance.result.then(function () {
			
		});
	};

}])

.controller('ModalController', function($rootScope, $scope, $modalInstance, toaster) {

	$scope.login = function () {
		Parse.User.logIn($scope.email, $scope.password, {
			success: function(retorno) {
				$rootScope.logged = true;
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

	$scope.save = function () {
		/*var Gift = Parse.Object().extend("Gift");
		var gift = new Gift();

		git.set('senderName', $scope.fullname);
		git.set('senderEmail', $scope.email);
		git.set('senderPhone', $scope.phone);
		
		gift.save(null, {
			success: function(guest) {
				$modalInstance.close();
				toaster.pop('success', "Presente confirmado!", 'Agradeçemos pelo presente! Até o casamento! ', 5000);
			},
			error: function(guest, error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});*/

		$modalInstance.close();
		var text = "Obrigado " + $scope.fullname + ". Agradeçemos pelo carinho e até o casamento! ";
		toaster.pop('success', "Presente confirmado!", text, 10000);	
	};

	$scope.create = function () {
		var newUser = new Parse.User();

		newUser.set('username', $scope.email);
		newUser.set('email', 	$scope.email);
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