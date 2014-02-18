'use strict';

angular.module('silentAuctionApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/auctions/new', {
        templateUrl: 'views/auctions/new.html',
        controller: 'NewAuctionCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('Auction', function($resource) {
    return $resource('http://localhost:8000/api/auctions', {}, {
      'get':    {method:'GET'},
      'save':   {method:'POST', headers: {'Authorization': 'Token ef98650e6630ac0ce071f3058920d76dc0ddf883'}},
      'query':  {method:'GET', isArray:true},
      'remove': {method:'DELETE', headers: {'Authorization': 'Token ef98650e6630ac0ce071f3058920d76dc0ddf883'}},
      'delete': {method:'DELETE', headers: {'Authorization': 'Token ef98650e6630ac0ce071f3058920d76dc0ddf883'}},
    });
  });
