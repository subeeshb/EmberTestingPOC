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

test("check routing to page 2", function() {
  visit("/").then(function() {
    click('#page2-link');
  }).then(function(){
    equal(find('#page-title').text(), 'This is page2.', 'Page Title');
  });
});

/*
test("check if button text changes", function() {
    var myButtonComponent = App.MyButtonComponent.create({
        buttonText: 'X',
        afterValue: 'Y'
    });
    window.myButton = myButtonComponent;

    equal(myButtonComponent.buttonText, 'X', 'Button text is "X"');
    myButton.triggerAction({action: 'changeValue', target: myButton})
    equal(myButtonComponent.buttonText, 'Y', 'Button text is "Y"');
});
*/