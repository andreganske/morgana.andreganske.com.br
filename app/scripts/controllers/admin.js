'use strict';

angular.module('myApp')

.controller('AdminController', ['$rootScope', '$scope', 'ParseSDK', '$modal', '$location', 'toaster', function($rootScope, $scope, ParseService, $modal, $location, toaster) {

	$scope.selection = [];

	$scope.templates = [
		{ name: 'gifts', url: 'app/scripts/views/gifts.html'},
		{ name: 'guest', url: 'app/scripts/views/guests.html'}
	];

	$scope.categories = [
		{ name: 'eletro', 		description: 'Eletro eletronicos'},
		{ name: 'kitchen', 		description: 'Cozinha'},
		{ name: 'utilities', 	description: 'Utilidades'},
		{ name: 'decor', 		description: 'Decoração'},
		{ name: 'others', 		description: 'Outros'},
	];

	if ($rootScope.logged) {
		$scope.user = Parse.User.current().get('fullname');
	}

	$scope.tab = 0;

	$scope.toggle = function (product) {
		product.selected = !product.selected;
		if (product.selected) {
			$scope.selection.push(product);
		} else {
			$scope.selection.splice($scope.selection.indexOf(product));
		}
	};

	$scope.changeTab = function(newTab) {
		$scope.tab = newTab;
	};

	$scope.isActiveTab = function(tab) {
		return $scope.tab === tab;
	};

	$scope.updateList = function() {
		var promise = ParseService.getProducts();

		promise.done(function() {
			$scope.products = [];

			for (var i = $rootScope.products.length - 1; i >= 0; i--) {
				var product = {name: '', description: '', category: '', available: '', id: ''},
					obj = $rootScope.products[i];
				
				product.name = obj.get('name');
				product.description = obj.get('description');
				product.category = obj.get('category');
				product.available = obj.get('available');
				product.availableTxt = obj.get('available') ? 'Disponível' : 'Reservado';
				product.id = obj.id;
				
				$scope.products.push(product);
			};
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

	$scope.edit = function() {

		if ($scope.selection.length == 0) {
			toaster.pop('warning', "Oooops", "Parece que voce não selecionou nenhum presente para editar :)", 5000);
		}

		if ($scope.selection.length > 1) {
			toaster.pop('warning', "Oooops", "Só conseguimos editar um presente de cada vez. Selecione apenas um (Y)", 5000);
		}

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
	};

	$scope.delete = function() {

<<<<<<< Updated upstream
=======
		ParseService.deleteProduct($scope).done(function() {
			var text = "Os presentes selecionados foram removidos com sucesso da lista de casamento!";
			toaster.pop('success', "Presentes removidos", text, 5000);
			$modalInstance.close();
		});
>>>>>>> Stashed changes
	};

	$scope.viewGifts();

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
		var promise = ParseService.editProduct($scope.selection[0]);

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
