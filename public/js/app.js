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
		$scope.editMode = false;
		var modalInstance = $modal.open({
			templateUrl: 'partials/addCustomer',
			controller: 'AddCustomerCtrl',
		});
		modalInstance.result.then(function() {
			refresh();
		});
	}
	
	$scope.editCustomerDialog = function(customer) {
		$scope.currentCustomer = customer;
		$scope.editMode = true;
		var modalInstance = $modal.open({
			templateUrl: 'partials/addCustomer',
			controller: 'AddCustomerCtrl',
			scope: $scope
		});
		modalInstance.result.then(function() {
			$scope.editMode = false;
			refresh();
		});
	}
 	 

});

app.controller('AddCustomerCtrl', function($scope, $modalInstance, Customers) {
	
	$scope.input = {};
	$scope.input.alert = "Name and Surname are compulsory fields.";
	$scope.input.invalid = false;
	
	if($scope.editMode) {
		$scope.input.name = $scope.currentCustomer.name;
		$scope.input.surname = $scope.currentCustomer.surname;
		$scope.input.description = $scope.currentCustomer.description;
	}

	$scope.ok = function () {
		if($scope.input.name && $scope.input.surname) {
			$scope.input.invalid = false;
			if(!$scope.editMode) {
				Customers.save({name: $scope.input.name, surname: $scope.input.surname, description: $scope.input.description});
			} 
			else {
				Customers.save({customerId: $scope.currentCustomer._id},  {name: $scope.input.name, surname: $scope.input.surname, description: $scope.input.description}, {action:"edit"});
			}
			$modalInstance.close();
		}
		else {
			$scope.input.invalid = true;
		}
		
  	};

  	$scope.cancel = function () {
    		$modalInstance.dismiss('cancel');
  	};	
});     

app.service('Customers', function($resource) {
        return $resource('/customer/:customerId', { customerId: '@id' });
});

