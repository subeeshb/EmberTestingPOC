App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.route('page2', { path: '/page2' });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.MyButtonComponent = Ember.Component.extend({
	actions: {
		changeValue: function(e) {
			this.set('buttonText', this.get('afterValue'));
		}
	}
});

App.NameInputComponent = Ember.Component.extend({
  nameValue: '',
  greeting: '',

  actions: {
    showGreeting: function(e) {
      this.set('greeting', 'Hello ' + this.get('nameValue'));
    }
  }
});

App.TestObject = {
    method1: function() {
        this.method2();
    },

    method2: function() {

    }
};


App.Page2Route = Ember.Route.extend({
  model: function() {
    return ['AAA', 'BBB', 'CCC'];
  },

  setupController: function(controller, model) {
    controller.set('model', model);
  }
});

App.Page2Controller = Ember.Controller.extend({
  model: null
});
