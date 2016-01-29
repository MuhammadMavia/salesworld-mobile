angular.module('SalesWorld')
  .controller("Products", function (ref, $scope, Users, Products, $ionicPopup, $http, firebaseRef, $firebaseArray) {
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
