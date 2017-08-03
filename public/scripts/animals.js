 angular.module('app', ['ngRoute', 'ngResource', 'ui.grid', 'ui.grid.selection'])
 	.factory('Animals', ['$resource', function($resource) {
 		return $resource('/animals/:id', null, null);
 	}])
 	.controller('AnimalController', ['$scope', 'Animals', function($scope, Animals) {
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
 	}]);