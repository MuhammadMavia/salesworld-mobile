angular.module('SalesWorld')
  .service("Company", function (ref, Tools, $http, $state, $q, firebaseRef, $ionicLoading) {
    this.getCompany = function (adminId) {
      var deferred = $q.defer();
      $http.get(ref + "/company/" + adminId).then(
        function (success) {
          if (!success.data) {

          } else {
            company = success.data;
            deferred.resolve(company);

          }
        },
        function (err) {
          company = err;
        });
      return deferred.promise;
    }
  });
