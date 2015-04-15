'use strict';

angular.module('myApp')

.controller('GuestController', ['$rootScope', '$scope', 'ParseSDK', '$modal', function($rootScope, $scope, ParseService, $modal) {
	
	var start = true;

    $scope.IntroOptions = {
        steps:[{
        		element: '#welcome',
        		intro: "Olá! Bem vindo à nossa lista de casamento! Esta é uma pequena introdução sobre como ela funciona. <strong>Para continuar, clique em próximo,</strong> ou use o botão de sair aqui em baixo."
	        },{
	            element: '#step1',
	            intro: "Caso deseje, você poderá nos presentear com <strong>valores em dinheiro</strong>. Aqui você encontrará as informações necessárias"
	        },{
	            element: '#step2',
	            intro: "<strong>Categorias:</strong> Para facilitar, separamos os presentes em cinco categorias. Desta forma, ficará mais fácil encontrar o presente certo xD"
	        },{
	            element: '#step2',
	            intro: "<strong>Presentes:</strong> As linhas em verde significam que o presente está disponível. Para selecioná-lo, clique nele. Preencha o formulário com suas informações e confirme o presente."
	        },{
	            element: '#step4',
	            intro: "Utilize este campo para buscar presentes em todas as categorias"
	        },{
	            element: '#step5',
	            intro: "<h4>Muito obrigado por nos ajudar a construir nosso novo lar :)</h4>"
	        }],
        showStepNumbers: false,
        exitOnOverlayClick: true,
        exitOnEsc: true,
        nextLabel: '<strong>Próximo</strong>',
        prevLabel: 'Anterior',
        skipLabel: 'Sair',
        doneLabel: 'Concluído'
    };

	$scope.init = function() {
		$scope.updateList();
	};

	$scope.updateList = function() {
		ParseService.getProducts().done(function() {
			$scope.products = $rootScope.products;
			if (start) {
				$scope.startIntro();
				start = false;
			}
		});
	};

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
}])

.controller('GuestModalController', function($rootScope, $scope, $modalInstance, ParseService, toaster, item) {

	$scope.item = item;
	$scope.showInfo = false;

	$scope.validadeForm = function() {
		var isValid = true;

		if ($scope.name === undefined || $scope.name.length <= 3) {
			$("input[name='name']").parent().toggleClass('has-error');
			isValid = false;
		}

		if ($scope.email === undefined || $scope.email.length <= 3) {
			$("input[name='email']").parent().toggleClass('has-error');
			isValid = false;
		}

		if ($scope.phone === undefined) {
			$("input[name='phone']").parent().toggleClass('has-error');
			isValid = false;
		}

		if ($scope.delivery === undefined) {
			$("#delivery-options").toggleClass('has-error');
			isValid = false;	
		}

		if (isValid) {
			this.save();
		} else {
			var text = "Parece que você não informou todos os dados do formulário. Verifique se todos os campos estão preecnhidos corretamente, e se a opção de entrega está selecionada :)";
			toaster.pop('error', "Ooopss!", text, 5000);
		}
	};

	$scope.save = function () {
		var _toaster = toaster,
			promise = ParseService.saveGuest($scope);

		promise.done(function() {
			var text = "Obrigado " + $scope.name + ". Agradeçemos pelo carinho e até o casamento! ";
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