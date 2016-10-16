import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('posts');
  this.route('home', {path: '/'});

  this.route('users', function() {
    this.route('new');
  });

  this.route('sessions', function() {
    this.route('new');
  });
  this.route('top_secret');
});

export default Router;
