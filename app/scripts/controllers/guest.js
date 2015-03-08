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

	$scope.selectItem = function(product) {
		var modalInstance = $modal.open({
			templateUrl: 'selectItem.html',
			controller: 'ModalController',
			scope: $scope,
			resolve: {
				item: function() {
					return product.name;
				}
			}
		});
	};

}])

.controller('ModalController', function($rootScope, $scope, $modalInstance, toaster, item) {

	$scope.item = item;
	$('#formError').alert();
	$scope.showInfo = false;

	$scope.validadeForm = function() {
		var isValid = true;

		if ($scope.fullname === undefined  || $scope.fullname.length <= 3) {
			$("input[name='name']").parent().toggleClass('has-error');
			isValid = false;
		}

		if ($scope.email === undefined  || $scope.email.length <= 3) {
			$("input[name='email']").parent().toggleClass('has-error');
			isValid = false;
		}

		if ($scope.phone === undefined  || $scope.phone.length < 11 ) {
			$("input[name='phone']").parent().toggleClass('has-error');
			isValid = false;
		}

		if ($scope.carrier != undefined || $scope.personal != undefined) {
			isValid = false;	
		}

		if (isValid) {
			this.save();
		} else {
			$('#formError').show();
		}
	};

	$scope.save = function () {
		var Guest = Parse.Object.extend("Guest");
		var guest = new Guest();

		guest.set('guest_name', 	$scope.fullname);
		guest.set('guest_email', 	$scope.email);
		guest.set('guest_phone', 	$scope.phone);
		guest.set('guest_delivery', $scope.delivery);
		guest.set('parent', item);
		
		guest.save(null, {
			success: function(guest) {	
				$modalInstance.close();
				var text = "Obrigado " + guest.get('guest_name') + ". Agradeçemos pelo carinho e até o casamento! ";
				toaster.pop('success', "Presente confirmado!", text, 10000);	
			},
			error: function(guest, error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	
});