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
    return $resource('http://localhost:8000/api/auctions\\/', {}, {
      'get':    {method:'GET'},
      'save':   {method:'POST', headers: {'Authorization': 'Token 4ffb7c1f15605d98c244a4f88fe83fef4dd3a565'}},
      'query':  {method:'GET', isArray:true},
      'remove': {method:'DELETE', headers: {'Authorization': 'Token 4ffb7c1f15605d98c244a4f88fe83fef4dd3a565'}},
      'delete': {method:'DELETE', headers: {'Authorization': 'Token 4ffb7c1f15605d98c244a4f88fe83fef4dd3a565'}},
    });
  });
