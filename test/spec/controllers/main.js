'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('silentAuctionApp'));

  var MainCtrl, scope, Auction, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller) {
    Auction = $injector.get('Auction');
    $httpBackend = $injector.get('$httpBackend');
    scope = $injector.get('$rootScope').$new();

    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      Auction: Auction
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should query Auction for all auctions', function () {
    $httpBackend.when('GET', 'http://localhost:8000/api/auctions')
      .respond([{title: 'Something'}]);

    $httpBackend.flush();

    expect(scope.auctions.length).toEqual(1);
    expect(scope.auctions[0].title).toEqual('Something');
  });
});

describe('Controller: NewAuctionCtrl', function() {
  beforeEach(module('silentAuctionApp'));

  var NewAuctionCtrl, scope, Auction, $httpBackend, location;

  beforeEach(inject(function ($injector, $controller, $rootScope) {
    location = $injector.get('$location');
    Auction = $injector.get('Auction');
    $httpBackend = $injector.get('$httpBackend');

    scope = $rootScope.$new();

    NewAuctionCtrl = $controller('NewAuctionCtrl', {
      $scope: scope,
      $location: location,
      Auction: Auction
    });
  }));
  
  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  describe('#save', function() {
    it('should POST the params to the API', function() {
      scope.save({title: 'Something'});
      
      $httpBackend.expectPOST('http://localhost:8000/api/auctions', {title: 'Something'})
        .respond(201, '');
      $httpBackend.flush();

      expect(location.path()).toEqual('/');
    });
  });
});
