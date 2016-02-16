angular.module('SalesWorld')
  .controller("LoginCtrl", function($scope, $timeout, $stateParams, ionicMaterialInk,ref, Users) {
      $scope.$parent.clearFabs();
      $timeout(function() {
          $scope.$parent.hideHeader();
      }, 0);
      ionicMaterialInk.displayEffect();
      $scope.doLogin = Users.doLogin;
  });
