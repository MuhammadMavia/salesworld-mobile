// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('SalesWorld', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'firebase', 'ngCordova'])

  .run(function ($ionicPlatform, $rootScope, $state, $timeout) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

      var firebaseToken = localStorage.getItem("firebaseToken");
      $timeout(function () {
        if (toState.name !== "app.login" && !firebaseToken) {
          event.preventDefault();
          $state.go("app.login")
        }
        else if ((toState.name == "app.login") && firebaseToken) {
          localStorage.removeItem("firebaseToken")
          //event.preventDefault();
          //$state.go("app.home");

        }
      });

    })
  })

  .constant("ref", "http://salesworld.herokuapp.com")
  //.constant("ref", "http://localhost:3000")
  .constant("firebaseRef", "https://salesworld.firebaseio.com/")
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

    $httpProvider.interceptors.push('httpInterceptor');

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
     // Turn off back button text
     $ionicConfigProvider.backButton.previousTitleText(false);
     */

    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.company', {
        url: '/company',
        views: {
          'menuContent': {
            templateUrl: 'templates/company.html',
            controller: 'CompanyCtrl'
          }
          /*,
          'fabContent': {
            template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
            controller: function ($timeout) {
              $timeout(function () {
                document.getElementById('fab-activity').classList.toggle('on');
              }, 200);
            }
          }*/
        }
      })

      .state('app.friends', {
        url: '/friends',
        views: {
          'menuContent': {
            templateUrl: 'templates/friends.html',
            controller: 'FriendsCtrl'
          },
          'fabContent': {
            template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
            controller: function ($timeout) {
              $timeout(function () {
                document.getElementById('fab-friends').classList.toggle('on');
              }, 900);
            }
          }
        }
      })

      .state('app.product', {
        url: '/product',
        views: {
          'menuContent': {
            templateUrl: 'templates/product.html',
            controller: 'ProductCtrl'
          }
          // 'fabContent': {
          //     template: '<button id="fab-gallery" ng-click="pushOrder()" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-paper-airplane"></i></button>',
          //     controller: function ($timeout) {
          //         $timeout(function () {
          //             document.getElementById('fab-gallery').classList.toggle('on');
          //         }, 600);
          //     }
          // }
        }
      })

      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
          },
          'fabContent': {
            template: ''
          }
        }
      })

      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
          }
          // 'fabContent': {
          //     template: '<button id="fab-profile" class="button button-fab button-fab-bottom-right button-energized-900"><i class="icon ion-plus"></i></button>',
          //     controller: function ($timeout) {
          //         /*$timeout(function () {
          //             document.getElementById('fab-profile').classList.toggle('on');
          //         }, 800);*/
          //     }
          // }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
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
