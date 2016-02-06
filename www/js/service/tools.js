angular.module('SalesWorld')
  .service("Tools", function ($cordovaGeolocation, $q, $ionicPopup) {
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

      };
      this.showAlert = function (title, template) {
        $ionicPopup.alert({
          title: title,
          template: template
        });
      };
      this.showLoading = function () {
        var loader = $ionicPopup.show({
          template: '' +
          '<div class="loader-box">' +
          '<ion-spinner class="loader spinner-positive" icon="bubbles"></ion-spinner>' +
          '</div>'
        });
        return loader;
      }
    }
  )
;
