'use strict';

angular.module('myApp')

.controller('AdminController', ['$rootScope', '$scope', 'ParseSDK', '$modal', '$location', 'toaster', function($rootScope, $scope, ParseService, $modal, $location, toaster) {

	$scope.tab = 0;
	
	$scope.selection = [];

	$scope.templates = [
		{ name: 'gifts', url: 'app/scripts/views/gifts.html'},
		{ name: 'guest', url: 'app/scripts/views/guests.html'}
	];

	$scope.categories = ParseService.categories;

	$scope.init = function() {
		$scope.viewGifts();
	},

	$scope.toggle = function (product) {
		product.selected = !product.selected;
	};

	$scope.changeTab = function(newTab) {
		$scope.tab = newTab;
	};

	$scope.isActiveTab = function(tab) {
		return $scope.tab === tab;
	};

	$scope.updateList = function() {
		ParseService.getProducts().done(function() {
			$scope.products = $rootScope.products;
		});
	};

	$scope.viewGifts = function() {
		$scope.pageheader = 'Nossos presentes';
		$scope.template = $scope.templates[0];
		$scope.updateList();
	};

	$scope.viewGuests = function() {
		$scope.pageheader = 'Nossos convidados';
		$scope.template = $scope.templates[1];
	};

	$scope.logoff = function() {
		ParseService.logout();
	};

	$scope.new = function() {
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
			$scope.updateList();
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
				$scope.updateList();
			});
		}
	};

	$scope.delete = function() {
		this.getSelected();

		ParseService.deleteProduct($scope).done(function() {
			var text = "Os presentes selecionados foram removidos com sucesso da lista de casamento!";
			toaster.pop('success', "Presentes removidos", text, 5000);
			$modalInstance.close();
		});
	};
}])

.controller('NewGiftController', function($rootScope, $scope, $modalInstance, ParseService, toaster, action) {

	$('#formError').alert();
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
		var _toaster = toaster,
			promise = ParseService.createProduct($scope);

		promise.done(function() {
			var text = $scope.name + " adicionado a lista de casamento!";
			_toaster.pop('success', "Novo presente cadastrado!", text, 5000);
			$modalInstance.close();
		});
	};

	$scope.edit = function () {
		var promise = ParseService.editProduct($scope);

		promise.done(function() {
			var text = $scope.name + " foi alterado e já está disponível na lista de casamento!";
			toaster.pop('success', "Presente alterado com sucesso!", text, 5000);
			$modalInstance.close();
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});
