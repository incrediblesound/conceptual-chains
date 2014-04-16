
/* Controllers */

function IndexCtrl ($scope, $http) {
	$http.get('/api/master').success(function (data) {
		$scope.data = data.data;
	});
}

function NewMasterCtrl ($scope, $http, $location) {
	$scope.form = {};
	$scope.saveMaster = function() {
		$http.post('/api/newMaster', $scope.form).
		success(function (data) {
			$location.url('/');
		})
	}
}