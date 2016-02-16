angular.module('SalesWorld')
  .service("Products", function (ref, $http, Users, $q) {
    this.getProducts = function (adminId) {
      var deferred = $q.defer();
      $http.get(ref + "/products/products/" + adminId).then(
        function (success) {
          deferred.resolve(success.data);
        },
        function (err) {
          deferred.resolve(err);
        }
      );
      return deferred.promise;
    }
  });
