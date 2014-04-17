
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

function ViewNode ($scope, $http, $location, $routeParams, $route) {
  $scope.form = {};
  var id = $routeParams.id;
  $http.get('/api/chain/' + id).success(function (data) {
    $scope.data = {master: id, children: data.data};
  });
  $scope.addChild = function() {
    $http.post('/api/newChild/'+id, $scope.form).success(function (data) {
      $route.reload();
    })
  }
}