angular.module('SalesWorld', ['ionic'])

  .run(function ($ionicPlatform, $rootScope, $state,$timeout) {
    /*$ionicPlatform.ready(function () {
     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
     // for form inputs)
     if (window.cordova && window.cordova.plugins.Keyboard) {
     cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
     cordova.plugins.Keyboard.disableScroll(true);

     }
     if (window.StatusBar) {
     // org.apache.cordova.statusbar required
     StatusBar.styleDefault();
     }
     });*/
    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        var firebaseToken = localStorage.getItem("firebaseToken");
        $timeout(function(){
          if (toState.name.slice(0, toState.name.indexOf(".")) === "app" && !firebaseToken) {
            event.preventDefault();
            $state.go("login")
          }
          else if ((toState.name == "login") && firebaseToken) {
            event.preventDefault();
            $state.go("app.home");

          }
        });

      })
  })


  .constant("ref", "http://localhost:3000")
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'Login'
      })
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'Products'
      })
      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html'
          }
        }
      })
      .state('app.newOrder', {
        url: '/newOrder',
        views: {
          'menuContent': {
            templateUrl: 'templates/newOrder.html'
          }
        }
      });

    $urlRouterProvider.otherwise('/app/newOrder');
  })
  .filter('capitalize', function () {
    return function (input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
  })
  .factory("httpInterceptor", function () {
    return {
      request: function (config) {
        var firebaseToken = localStorage.getItem("firebaseToken");
        if (firebaseToken) {
          config.url = config.url + "?firebaseToken=" + firebaseToken;
        }
        return config;
      }
    }
  });
