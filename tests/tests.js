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
  visit("/").then(function() {
    equal(find('.comp-button').val(), 'Before', 'Button text is "Before"');
  }).then(function() {
    click('.comp-button');
  }).then(function() {
    equal(find('.comp-button').val(), 'After', 'Button text is "After"');
  });
});

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