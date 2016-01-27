angular.module('SalesWorld')
  .controller("Login", function (ref, $scope, $http) {

    $scope.doLogin = function (user) {
      $http.post(ref + "/account/login-salesman", user)
        .then(function (success) {
          if(success.data){
            localStorage.setItem("firebaseToken",success.data.firebaseToken)
          }
            console.log(success);
          },
          function (err) {
            console.log(err);
          })
    }

  });
