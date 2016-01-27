angular.module('SalesWorld', ['ionic'])

  /*.run(function($ionicPlatform) {
   $ionicPlatform.ready(function() {
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
   });
   })*/

  .constant("ref","")
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'Login'
      })
      /*.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'templates/search.html'
          }
        }
      })
      .state('app.browse', {
        url: '/browse',
        views: {
          'menuContent': {
            templateUrl: 'templates/browse.html'
          }
        }
      })
      .state('app.playlists', {
        url: '/playlists',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlists.html',
            controller: 'PlaylistsCtrl'
          }
        }
      })
      .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlist.html',
            controller: 'PlaylistCtrl'
          }
        }
      });*/

    $urlRouterProvider.otherwise('login');
  });
