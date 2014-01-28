App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
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

App.TestObject = {
    method1: function() {
        this.method2();
    },

    method2: function() {

    }
};