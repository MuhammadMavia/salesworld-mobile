angular.module('SalesWorld')
  .controller("Products", function ($cordovaGeolocation, $ionicPlatform, ref, Tools, $scope, Users, Products, $cordovaBackgroundGeolocation, $ionicPopup, $http, firebaseRef, $firebaseArray) {
    $scope.selectedProducts = [];


    Users.getLoggedInUser().then(function (data) {
      /* var listRef = new Firebase(firebaseRef);
       listRef = listRef.child("presence").child(data._id);
       var userRef = listRef.push();

       /!*var obj = $firebaseObject(listRef);
       console.log(obj);*!/

       var presenceRef = new Firebase("https://salesworld.firebaseio.com/.info/connected");
       presenceRef.on("value", function (snap) {
       if (snap.val()) {

       var online = $firebaseArray(listRef);
       //userRef.onDisconnect().remove();
       userRef.onDisconnect().remove();
       console.log(online);
       /!* obj.online = true;
       obj.$save();*!/
       userRef.set(true);
       }
       });*/
      $scope.loggedInUser = data;
      Products.getProducts(data.adminId).then(function (data) {
        $scope.products = data;
      });
    });
    $scope.doLogOut = Users.doLogOut;
    $scope.selectProduct = function (product) {
      $scope.selectedProduct = product;
      $ionicPopup.show({
        template: '<input type="number" ng-model="selectedProduct.quantity">',
        title: 'Quantity',
        subTitle: $scope.selectedProduct.name,
        scope: $scope,
        buttons: [
          {text: 'Cancel'},
          {
            text: '<b>Add</b>',
            type: 'button-positive',
            onTap: function (e) {
              !$scope.selectedProduct.quantity ? e.preventDefault() : $scope.selectedProducts.push($scope.selectedProduct);
            }
          }
        ]
      });
    };
    $scope.pushOrder = function () {
      Tools.position().then(function (position) {
        var data = {
          coords: {longitude: position.coords.longitude, latitude: position.coords.latitude},
          //longitude:  position.coords.longitude,
          data: $scope.selectedProducts,
          salesman: $scope.loggedInUser
        };
        $http.post(ref + "/products/pushOrder", data).then(
          function (success) {
            console.log(success);
          },
          function (err) {
            console.log(err);
          }); //http post

      });

    };
    /*
     var options = {
     // https://github.com/christocracy/cordova-plugin-background-geolocation#config
     };

     $ionicPlatform.ready(function () {
     /!* alert("Platform Ready");
     $cordovaBackgroundGeolocation.configure(options)
     .then(
     null, // Background never resolves
     function (err) { // error callback
     console.log(err);
     },
     function (location) { // notify callback
     console.log(location);
     });*!/


     /!*$scope.stopBackgroundGeolocation = function () {
     $cordovaBackgroundGeolocation.stop();
     };*!/

     });*/


  });
