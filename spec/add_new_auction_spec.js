describe('Add New Auction', function() {
  beforeEach(function() {
    browser.get('/');
  });

  it('should not display any auctions by default', function() {
    browser.findElements(by.css('.auction')).then(function(elements) {
      expect(elements.length).toEqual(0);
    });
  });

  it('should allow me to add a new auction', function() {
    element(by.linkText('Add New Auction')).click();

    element(by.model('auction.title')).sendKeys('This is my cool title!');
    element(by.buttonText('Save')).click();

    browser.waitForAngular().then(function() {
      expect(browser.getCurrentUrl()).toEqual('/');
      expect(by.repeater('auction in auctions').row(0).column('title')).toEqual('This is my cool title!');
    });
  });
});
