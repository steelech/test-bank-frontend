import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('posts');
  this.route('login');
  this.route('dashboard');
  this.route('signup');
  this.route('users');
});

export default Router;
