angular.module('SalesWorld')
  .service("Users", function (ref, $http, $state, $q, firebaseRef) {
    this.doLogin = function (user) {
      $http.post(ref + "/account/login-salesman", user)
        .then(function (success) {
            if (success.data) {
              loggedInUser = success.data;
              localStorage.setItem("firebaseToken", success.data.firebaseToken);
              $state.go("app.home")
            }
          },
          function (err) {
            console.log(err);
          })
    };
    this.getLoggedInUser = function () {
      var deferred = $q.defer();
      $http.get(ref + "/users/").then(
        function (success) {
          deferred.resolve(success.data);
        },
        function (error) {
          deferred.resolve(error);
        });

      return deferred.promise;
    };
    this.doLogOut = function () {
      $state.go("login");
      localStorage.removeItem("firebaseToken");
    };
  });
