
App.rootElement = '#ember-testing';
App.setupForTesting();
App.injectTestHelpers();

module("Integration tests", {
  setup: function() {

    Ember.run(App, App.advanceReadiness);
  },
  teardown: function() {
    App.reset();
  }
});


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



test("check initial Route name", function() {
    expect(1); // Ensure that we will perform one assertion

    visit("/");

    andThen(function(){
        equal(currentRouteName(),'index');
    });
});

test("check next Route name", function(){
    expect(1); // Ensure that we will perform one assertion

    visit("/page2");

    // Wait for asynchronous helpers above to complete
    andThen(function() {
        equal(currentRouteName(),'page2');
    });
});

test("check routing to page 2", function() {
    visit("/").then(function() {
        click('#page2-link');
    }).then(function(){
            equal(find('#page-title').text(), 'This is page2.', 'Page Title');
    });
});


module("Unit testing");

test('Checking the page title', function() {
    var person = App.Page2Controller.create(['AAA', 'BBB', 'CCC']);
    var result = person.get('page2_title');
    equal(result, 'This is page2.', "Page title is " + result);
});

//moduleForComponent('pretty-color');
//test('Checking the page title', function() {
//    var person = App.Page2Controller.create(['AAA', 'BBB', 'CCC']);
//    var result = person.get('page2_title');
//    equal(result, 'This is page2.', "Page title is " + result);
//});
