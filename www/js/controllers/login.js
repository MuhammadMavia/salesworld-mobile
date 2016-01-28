angular.module('SalesWorld')
  .controller("Login", function (ref, $scope, Users) {
    $scope.doLogin = Users.doLogin;
  });
