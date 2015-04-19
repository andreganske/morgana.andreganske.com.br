'use strict';

angular.module('myApp')

.controller('GuestController', ['$rootScope', '$scope', 'ParseSDK', '$modal', function($rootScope, $scope, ParseService, $modal) {

    $scope.IntroOptions = {
        steps:[{
        		element: '#welcome',
        		intro: "<h5>Olá! Bem vindo à nossa lista de casamento! Esta é uma pequena introdução sobre como ela funciona. <strong>Para continuar, clique em próximo,</strong> ou use o botão de sair aqui em baixo.</h5>"
	        },{
	            element: '#step1',
	            intro: "<h5>Caso deseje, você poderá nos presentear com <strong>valores em dinheiro</strong>. Aqui você encontrará as informações necessárias</h5>",
	            position: 'right'
	        },{
	            element: '#step2',
	            intro: "<h5><strong>Categorias:</strong> Para facilitar, separamos os presentes em cinco categorias. Desta forma, ficará mais fácil encontrar o presente certo xD</h5>"
	        },{
	            element: '#step2',
	            intro: "<h5><strong>Presentes:</strong> As linhas em verde significam que o presente está disponível. Para selecioná-lo, clique nele. Preencha o formulário com suas informações e confirme o presente.</h5>"
	        },{
	            element: '#step4',
	            intro: "<h5>Utilize este campo para buscar presentes em todas as categorias</h5>"
	        },{
	            element: '#step5',
	            intro: "<h5>Muito obrigado por nos ajudar a construir nosso novo lar :)</h5>"
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
		ParseService.getProducts($scope);
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
				ParseService.getProducts($scope);
			});
		}
	};

	$scope.moneyModal = function() {
		var modalInstance = $modal.open({
			templateUrl: 'giftModal.html',
			controller: 'GiftModalController'
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
		$(".modal-footer input[type=button]").prop('disabled', 'true');
		ParseService.saveGuest($scope, $modalInstance, toaster);
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