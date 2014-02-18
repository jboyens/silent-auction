'use strict';

angular.module('silentAuctionApp')
  .controller('MainCtrl', function ($scope, Auction) {
    var auctions = Auction.query(function() {
      $scope.auctions = auctions;
    });
  })

  .controller('NewAuctionCtrl', function ($scope, $location, Auction) {
    $scope.save = function(params) {
      var auction = new Auction(angular.copy(params));
      auction.$save({}, function() {
        $location.path('/');
      }, function() {
        console.log('ERROR', arguments);
      });
    };
  });
