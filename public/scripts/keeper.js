var app = angular.module('app', ['ngAnimate', 'ngTouch', 'ui.grid', 'ui.grid.selection', 'ui.grid.exporter', 'ui.grid.moveColumns']);

app.factory('Animals', ['$http', function($http) {
	return $http.get('/keeper');
}]);

app.controller('KeeperController', ['$scope', 'Animals', function($scope, Animals) {
	$scope.gridOptions = {
		columnDefs: [{
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
		}],

		exporterLinkLabel: 'get your csv here',
		exporterPdfDefaultStyle: {
			fontSize: 9
		},
		exporterPdfTableStyle: {
			margin: [30, 30, 30, 30]
		},
		exporterPdfTableHeaderStyle: {
			fontSize: 10,
			bold: true,
			italics: true,
			color: 'red'
		},
		exporterPdfOrientation: 'portrait',
		exporterPdfPageSize: 'LETTER',
		exporterPdfMaxGridWidth: 500,

		onRegisterApi: function(gridApi) {
			$scope.gridApi = gridApi;
		}
	};

	Animals.then(function(data) {
		$scope.gridOptions.data = data.data;
		console.log(data.data);
	}).catch(function(data, status) {
		console.log(data, status);
		$scope.gridOptions.data = [];
	});

	$scope.exportToPdf = function() {
		$scope.gridApi.exporter.pdfExport('all', 'visible');
	};

	$scope.exportToCsv = function() {
		$scope.gridApi.exporter.csvExport('all', 'visible');
	};
}]);