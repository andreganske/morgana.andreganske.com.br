'use strict';

angular.module('myApp')

.controller('AdminController', ['$rootScope', '$scope', 'ParseSDK', '$modal', '$location', 'toaster', function($rootScope, $scope, ParseService, $modal, $location, toaster) {
	
	$scope.selection = [];

	$scope.count_guest = 0;
	$scope.count_gifts = 0;	

	$scope.categories = ParseService.categories;

	$scope.init = function() {
		ParseService.validateLoggedUser();

		$scope.updateGifts();
		$scope.updateGuests();

		ParseService.setCounters($scope);
	},

	$scope.toggle = function (product) {
		product.selected = !product.selected;
	};

	$scope.updateGifts = function() {
		ParseService.getProducts($scope);
	};

	$scope.updateGuests = function() {
		ParseService.getGuests($scope);
	};	

	$scope.logoff = function() {
		ParseService.logout();
	};

	$scope.new = function() {
		$scope.selection = [];
		
		var modalInstance = $modal.open({
			templateUrl: 'newGift.html',
			controller: 'NewGiftController',
			scope: $scope,
			resolve: {
				ParseService: function() {
					return ParseService;
				},
				action: function() {
					return 'create';
				}
			}
		});
		modalInstance.result.then(function () {
			$scope.updateGifts();
		});
	};

	$scope.getSelected = function() {
		$scope.selection = [];
		$.each($scope.products, function(key, product) {
			if (product.selected) {
				$scope.selection.push(product);
			}
		});
	};

	$scope.edit = function() {
		this.getSelected();

		if ($scope.selection.length == 0) {
			toaster.pop('warning', "Oooops", "Parece que voce não selecionou nenhum presente para editar :)", 5000);
		} else if ($scope.selection.length != 1) {
			toaster.pop('warning', "Oooops", "Só conseguimos editar um presente de cada vez. Selecione apenas um (Y)", 5000);
		} else {
			var modalInstance = $modal.open({
				templateUrl: 'newGift.html',
				controller: 'NewGiftController',
				scope: $scope,
				resolve: {
					ParseService: function() {
						return ParseService;
					},
					action: function() {
						return 'edit';
					}
				}
			});
			modalInstance.result.then(function () {
				$scope.updateGifts();
			});
		}
	};

	$scope.delete = function() {
		this.getSelected();
		ParseService.deleteProduct($scope, toaster);
	};
}])

.controller('NewGiftController', function($rootScope, $scope, $modalInstance, ParseService, toaster, action) {

	$scope.showInfo = false;

	if ($scope.selection.length == 1) {
		$scope.name = $scope.selection[0].name;
		$scope.description = $scope.selection[0].description;
		$scope.category = $scope.selection[0].category;
	}

	$scope.validadeForm = function() {
		if (action == 'create') {
			this.save();
		} else if (action == 'edit') {
			this.edit();
		}
	};

	$scope.handleSaveButton = function() {
		if ($scope.selection.length > 0 && $scope.selection[0].id) {
			this.edit();
		} else {
			this.save();
		}
	};

	$scope.save = function () {
		ParseService.createProduct($scope, $modalInstance, toaster);
	};

	$scope.edit = function () {
		ParseService.editProduct($scope).done(function() {
			var text = $scope.name + " foi alterado e já está disponível na lista de casamento!";
			toaster.pop('success', "Presente alterado com sucesso!", text, 5000);
			ParseService.getGuests($scope);
			$modalInstance.close();
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});
