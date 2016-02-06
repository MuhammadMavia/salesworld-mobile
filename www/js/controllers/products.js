angular.module('SalesWorld')
  .controller("Products", function (Company, $cordovaGeolocation, $ionicPlatform, ref, Tools, $scope, Users, Products, $cordovaBackgroundGeolocation, $ionicPopup, $http, firebaseRef, $firebaseArray) {
    $scope.selectedProducts = [];
    Users.getLoggedInUser().then(function (data) {
      $scope.loggedInUser = data;
      /*Company.getCompany(data.adminId).then(function(company){
        console.log(company);
      });*/
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
        subTitle: $scope.selectedProduct.name.toUpperCase(),
        scope: $scope,
        buttons: [
          {text: 'Cancel'}, {text: 'Cancel'},
          {
            text: '<b>Add</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.selectedProduct.quantity) {
                e.preventDefault()
              }
              else {
                $scope.selectedProducts.push($scope.selectedProduct);
                $scope.selectedProduct.quantity = null;
              }
              // !$scope.selectedProduct.quantity ? e.preventDefault() : $scope.selectedProducts.push($scope.selectedProduct);
            }
          }
        ]
      });
    };
    $scope.pushOrder = function () {
      var loader = Tools.showLoading();
      Tools.position().then(function (position) {
        var data = {
          coords: {longitude: position.coords.longitude, latitude: position.coords.latitude},
          data: $scope.selectedProducts,
          salesman: $scope.loggedInUser
        };
        $http.post(ref + "/products/pushOrder", data).then(
          function (success) {
            loader.close();
            Tools.showAlert("Successful", "Notification sent successfully");
            console.log(success);
          },
          function (err) {
            loader.close();
            Tools.showAlert("Failed", "Notification sent failed!");
            console.log(err);
          });
      });
    };
  });
