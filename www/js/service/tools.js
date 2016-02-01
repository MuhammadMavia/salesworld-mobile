angular.module('SalesWorld')
  .service("Tools", function ($cordovaGeolocation, $q) {
    this.position = function () {
      var deferred = $q.defer();
      $cordovaGeolocation
        .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
        .then(function (position) {
          deferred.resolve(position);
        }, function (err) {
          deferred.resolve(err);
        });
      return deferred.promise;

    }
  });
