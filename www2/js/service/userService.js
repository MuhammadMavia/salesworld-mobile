angular.module('SalesWorld')
  .service("Users", function (ref, Tools, $http, $state, $q, firebaseRef, $ionicLoading) {
    var loader = null;
    this.doLogin = function (user) {
      loader = Tools.showLoading();
      user.userName = user.userName.toLowerCase();
      user.password = user.password.toLowerCase();
      $http.post(ref + "/account/login-salesman", user)
        .then(function (success) {
            if (success.data) {
              loader.close();
              loggedInUser = success.data;
              localStorage.setItem("firebaseToken", success.data.firebaseToken);
              $state.go("app.home")
            }
            else {
              loader.close();
              Tools.showAlert("Logging Failed!", "Wrong Email or password!");
              console.log(success.data)
            }
          },
          function (err) {
            loader.close();
            Tools.showAlert("Logging Failed!", "Please try again later!");
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
      localStorage.removeItem("firebaseToken");
      $state.go("login");
    };
  });
