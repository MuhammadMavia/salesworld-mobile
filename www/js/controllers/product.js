angular.module('SalesWorld')
  .controller("ProductCtrl", function (Company, $cordovaGeolocation, $ionicPlatform, ref, Tools, Users, Products, $cordovaBackgroundGeolocation, $ionicPopup, $http, firebaseRef, $firebaseArray ,$scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);



    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

    $scope.selectedProducts = [];
    Users.getLoggedInUser().then(function (data) {
      $scope.loggedInUser = data;
      // Company.getCompany(data.adminId).then(function(company){
      //   console.log(company);
      // });
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
          {text: 'Cancel'},
          {
            text: '<b>Add</b>',
            type: 'button-stable',
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
