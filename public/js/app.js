var app = angular.module('myApp', ['ui.bootstrap', 'ngResource' ]);

app.controller('MainCtrl', function($scope, $modal, Customers) {
       
	refresh(); 
		
	$scope.getCustomerById = function() {
		var customer = Customers.get({customerId: $scope.searchId}, function() {
			if(customer != null) {
				alert('found');
			}
		});
	}

	$scope.deleteCustomer = function(id) {
		Customers.delete({customerId: id});
		refresh();
	}

	function refresh() {
		$scope.customers = Customers.query();
	}

	// Dialog functions
	
	$scope.addCustomerDialog = function() {
		var modalInstance = $modal.open({
			templateUrl: 'partials/addCustomer',
			controller: 'AddCustomerCtrl',
		});
		modalInstance.result.then(function() {
			refresh();
		});
	}
 	 

});

app.controller('AddCustomerCtrl', function($scope, $modalInstance, Customers) {
	
	$scope.input = {};

	$scope.ok = function () {
		console.log($scope.input.name);
		console.log($scope.input.customers);
		Customers.save({name: $scope.input.name, surname: $scope.input.surname, description: $scope.input.description});
		$modalInstance.close();
  	};

  	$scope.cancel = function () {
    		$modalInstance.dismiss('cancel');
  	};	
});     

app.service('Customers', function($resource) {
        return $resource('/customer/:customerId', { customerId: '@id' });
});

