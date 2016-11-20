import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('uploads');
  this.route('login', {path: '/'});
  this.route('dashboard');
  this.route('signup');
  this.route('users');
});

export default Router;
