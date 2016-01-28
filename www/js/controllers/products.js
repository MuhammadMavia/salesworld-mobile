angular.module('SalesWorld')
  .controller("Products", function (ref, $scope, Users, Products, $ionicPopup, $http) {
    $scope.selectedProducts = [];

    Users.getLoggedInUser().then(function (data) {
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
      var data = {
        data: $scope.selectedProducts,
        salesman: $scope.loggedInUser
      };
      $http.post(ref + "/products/pushOrder", data).then(
        function (success) {
          console.log(success);
        },
        function (err) {
          console.log(err);
        }
      )
    }
  });
