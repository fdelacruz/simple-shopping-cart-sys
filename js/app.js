App = Ember.Application.create({
  // Basic logging, e.g. "Transitioned into 'post'"
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  // put your routes here
});

App.Product = DS.Model.extend({
  name: DS.attr(),
  description: DS.attr(),
  price: DS.attr()
});

App.ProductAdapter = DS.FixtureAdapter.extend();

App.Product.FIXTURES = [
  {
    id: 1,
    name: 'Playstation 3',
    description: 'Last Gen console with the best exclusives',
    price: 200
  },
  {
    id: 2,
    name: 'Xbox 360',
    description: 'Last Gen console with the best addons like Kinnect',
    price: 180
  }
];

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('product');
  }
});
