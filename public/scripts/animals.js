angular.module('app', ['ngRoute', 'ngResource', 'ui.grid', 'ui.grid.edit'])
	.factory('Animals', ['$resource', function($resource){
		return $resource('/animals/:id', null, null);
	}])
	.controller('AnimalController', ['$scope', 'Animals', function($scope, Animals){
		$scope.animals = Animals.query();
		$scope.gridOptions = {
			columnDefs: [
				{ name:'Name', field: 'name' },
				{ name:'Kind', field: 'kind' },
				{ name:'Nouraished At', field: 'nouraished_at' },
				{ name:'Age', field: 'age' },
				{ name:'Cage', field: 'cage' },
				{ name:'Keeper', field: 'keeper' },
			],
			data: $scope.animals
		};
	}]);