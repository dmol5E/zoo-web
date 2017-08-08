 angular.module('app', ['ngRoute', 'ngResource', 'ui.grid', 'ui.grid.selection', 'ngSanitize', 'ui.select'])
 	.factory('Animals', ['$resource', function($resource) {
 		return $resource('/animals/:id', null, {
 			'update': {
 				method: 'PUT'
 			}
 		});
 	}])
 	.factory('Keepers', ['$resource', function($resource) {
 		return $resource('/animals/keepers', null, null);
 	}])
 	.controller('AnimalController', ['$scope', '$location', 'Animals', function($scope, $location, Animals) {
 		$scope.gridOptions = {
 			enableRowSelection: true,
 			enableRowHeaderSelection: false
 		};

 		$scope.gridOptions.columnDefs = [{
 			name: 'Имя',
 			field: 'name'
 		}, {
 			name: 'Вид',
 			field: 'species'
 		}, {
 			name: 'Возраст',
 			field: 'age'
 		}, {
 			name: 'Клетка',
 			field: 'cage'
 		}, {
 			name: 'Смотритель',
 			field: 'fullname()'
 		}, ];

 		$scope.gridOptions.multiSelect = false;
 		$scope.gridOptions.modifierKeysToMultiSelect = false;
 		$scope.gridOptions.noUnselect = true;
 		$scope.gridOptions.onRegisterApi = function(gridApi) {
 			$scope.gridApi = gridApi;
 		};

 		$scope.gridOptions.data = 'animals';

 		$scope.animals = Animals.query();
 		$scope.animals.$promise.then(function(value) {
 			angular.forEach(value, function(row) {
 				row.fullname = function() {
 					return row.keeper.name + ' ' + row.keeper.first_name;
 				};
 			});
 		});

 		$scope.selectedLog = function() {
 			console.log($scope.gridApi.selection.getSelectedRows());
 		};

 		$scope.currentAnimal = function() {
 			return $scope.gridApi.selection.getSelectedRows();
 		};

 		$scope.changeKeeper = function() {
 			$location.path('/change/' + $scope.currentAnimal()[0]._id);
 		};

 		$scope.import = function() {
 			$location.path('/import');
 		};
 	}])
 	.controller('ChangeKeeperController', ['$scope', '$routeParams', 'Animals', 'Keepers', function($scope, $routeParams, Animals, Keepers) {
 		$scope.animal = Animals.get({
 			id: $routeParams.id
 		});
 		$scope.keepers = Keepers.query();

 		$scope.updateKeeper = function() {
 			$scope.animal.keeper = $scope.keeper;
 			Animals.update({id: $scope.animal._id}, $scope.animal).$promise
 				.then(function (item) {
 					document.getElementById("success-block").hidden = false;
 				})
 				.catch(function (err) {
 					var errorBlock = document.getElementById("error-block");
 					errorBlock.hidden = false;
 					errorBlock.innerHTML = errorBlock.innerHTML + ' ' + err.statusText;
 				});
 		};

 		$scope.OnClickSelect = function(item) {
 			$scope.keeper = item;
 		};
 	}])
 	.controller('ImportAnimalController', ['$scope', function($scope) {

 	}])
 	.config(['$routeProvider', function($routeProvider) {
 		$routeProvider
 			.when('/', {
 				templateUrl: '/view.html',
 				controller: 'AnimalController'
 			})
 			.when('/change/:id', {
 				templateUrl: '/changeKeeper.html',
 				controller: 'ChangeKeeperController'
 			})
 			.when('/import', {
 				templateUrl: '/import.html',
 				controller: 'ImportAnimalController'
 			});
 	}]);