App.rootElement = '#ember-testing';
App.setupForTesting();
App.injectTestHelpers();

module("Integration tests", {
  setup: function() {
    if (window.location.search.indexOf("?test") === -1) {
      // //karma
      document.write(
        '<div id="qunit"></div>' +
        '<div id="qunit-fixture"></div>' +
        '<div id="ember-testing-container" style="visibility: hidden;">' +
        '<div id="ember-testing"></div>' +
        '</div>' +
        '<link rel="stylesheet" href="tests/runner.css">' +
        '<link rel="stylesheet" href="tests/vendor/qunit-1.12.0.css">' +
        '<script src="tests/vendor/qunit-1.12.0.js"></script>' +
        '<script src="tests/tests.js"></script>'
      );
    }

    Ember.run(App, App.advanceReadiness);
  },
  teardown: function() {
    App.reset();
  }
});

// test("test test", function() {
//   equal(1, 1, "test works");
// })


test("check if button text changes using ember integration testing", function() {
  var intialState = 'Before';
  visit("/").then(function() {    
    equal(find('.comp-button').val(), intialState, 'Button text is '+intialState);
  }).then(function() {
    for(var i=0; i<4; i++) {
      click('.comp-button').then(function(){
        intialState = (intialState === "Before" ? "After" : "Before");
        equal(find('.comp-button').val(), intialState, 'Button text is '+intialState);
      });
    }
  }); 
});

test("check routing to page 2", function() {
  visit("/").then(function() {
    click('#page2-link');
  }).then(function(){
    equal(find('#page-title').text(), 'This is page2.', 'Page Title');
  });
});
