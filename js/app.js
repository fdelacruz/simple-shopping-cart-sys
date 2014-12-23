App = Ember.Application.create({
  // Basic logging, e.g. "Transitioned into 'post'"
  LOG_TRANSITIONS: true
});

App.Router.map(function() {
  this.route('product', { path: '/products/:product_id' });
  this.route('addProduct', { path: '/addProduct' });
  this.route('editProduct', { path: '/editProduct/:product_id' });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('product');
  }
});

App.AddProductController = Ember.ObjectController.extend({
  model: {},
  actions: {
    saveProduct: function() {
      var newProduct = this.store.createRecord('product', {
        name: this.get('name'),
        description: this.get('description'),
        price: this.get('price')
      });
      controller = this;
      newProduct.save().then(function(){
        controller.transitionToRoute('index')
      });
    }
  }
});

App.EditProductController = Ember.ObjectController.extend({
  actions: {
    saveProduct: function() {
      var controller = this;
      this.get('model').save().then(function(){
        controller.transitionToRoute('index')
      });
    }
  }
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
