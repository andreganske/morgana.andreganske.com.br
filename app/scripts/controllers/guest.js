'use strict';

angular.module('myApp')

.controller('GuestController', ['$rootScope', '$scope', 'ParseSDK', '$modal', function($rootScope, $scope, ParseService, $modal) {
	
	if ($rootScope.logged) {
		$scope.user = Parse.User.current().get('fullname');
	}

	$scope.updateList = function() {
		var promise = ParseService.getProducts();

		promise.done(function() {
			for (var i = $rootScope.products.length - 1; i >= 0; i--) {
				var product = {name: '', description: '', category: '', available: '', id: ''},
					obj = $rootScope.products[i];
				
				product.name = obj.get('name');
				product.description = obj.get('description');
				product.category = obj.get('category');
				product.available = obj.get('available');
				product.id = obj.id;
				
				$scope.products.push(product);
			};
		});
	},

	$scope.selectItem = function(product) {
		if (product.available) {
			var modalInstance = $modal.open({
				templateUrl: 'selectItem.html',
				controller: 'GuestModalController',
				scope: $scope,
				resolve: {
					item: function() {
						return product;
					}, 

					ParseService: function() {
						return ParseService;
					}
				}
			});

			modalInstance.result.then(function () {
				$scope.updateList();
			});
		}
	};

	$scope.moneyModal = function() {
		var modalInstance = $modal.open({
			templateUrl: 'giftModal.html',
			controller: 'GiftModalController',
			scope: $scope
		});
	};

	$scope.updateList();

}])

.controller('GuestModalController', function($rootScope, $scope, $modalInstance, ParseService, toaster, item) {

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
		var _toaster = toaster,
			promise = ParseService.saveGuest($scope);

		promise.done(function() {
			var text = "Obrigado " + $scope.fullname + ". Agradeçemos pelo carinho e até o casamento! ";
			_toaster.pop('success', "Presente confirmado!", text, 10000);
			$modalInstance.close();
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
})

.controller('GiftModalController', function($rootScope, $scope, $modalInstance) {

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

});