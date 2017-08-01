 angular.module('app', ['ngRoute', 'ngResource', 'ui.grid', 'ui.grid.edit'])
 	.factory('Animals', ['$resource', function($resource) {
 		return $resource('/animals/:id', null, null);
 	}])
 	.controller('AnimalController', ['$scope', 'Animals', function($scope, Animals) {
 		$scope.animals = Animals.query();
 		$scope.animals.$promise.then(function(value) {
 			angular.forEach(value, function(row) {
 				row.fullname = function() {
 					return row.keeper.name + ' ' + row.keeper.first_name;
 				};
 			});
 		});
 		$scope.gridOptions = {
 			columnDefs: [{
 				name: 'Name',
 				field: 'name'
 			}, {
 				name: 'Kind',
 				field: 'kind'
 			}, {
 				name: 'Nourished At',
 				field: 'nourished_at',
 				type: 'date'
 			}, {
 				name: 'Age',
 				field: 'age'
 			}, {
 				name: 'Cage',
 				field: 'cage'
 			}, {
 				name: 'Keeper',
 				field: 'fullname()'
 			}, ],
 			data: 'animals'
 		};
 	}]);