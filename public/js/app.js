'use strict';

angular.module('myApp', []).
config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/partials/index',
      controller: IndexCtrl
    }).
    when('/add', {
      templateUrl: '/partials/newMaster',
      controller: NewMasterCtrl
    }).
    otherwise({
      redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
}]);