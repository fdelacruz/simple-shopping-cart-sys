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

App.IndexController = Ember.ArrayController.extend({
  actions: {
    deleteProduct: function(product){
      if(confirm('Are you sure you want to delete this product')){
        product.destroyRecord();
      }
    }
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
  price: DS.attr(),
  reviews: DS.hasMany('review', {async: true})
});

App.Review = DS.Model.extend({
  text: DS.attr(),
  rating: DS.attr(),
  product: DS.belongsTo('product', {async: true})
});

App.ProductAdapter = DS.FixtureAdapter.extend();
App.ReviewAdapter = DS.FixtureAdapter.extend();

App.Product.FIXTURES = [
  {
    id: 1,
    name: 'Playstation 3',
    description: 'Last Gen console with the best exclusives',
    price: 200,
    reviews: [2, 3]
  },
  {
    id: 2,
    name: 'Xbox 360',
    description: 'Last Gen console with the best addons like Kinnect',
    price: 180,
    reviews: [1]
  }
];

App.Review.FIXTURES = [
  {
    id: 1,
    text: 'I like this Xbox console',
    rating: 4,
    product: 2
  },
  {
    id: 2,
    text: 'I like this PS3 console',
    rating: 4,
    product: 1
  },
  {
    id: 3,
    text: 'PS3 is the best',
    rating: 5,
    product: 1
  }
];
