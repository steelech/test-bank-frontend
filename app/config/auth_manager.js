import Ember from 'ember';
import User from '..models/user';
import DS from 'ember-data';

export default Ember.Object.extend({
	init: function() {
		this._super();
		var accessToken = $.cookie('access_token');
		var authUserId = $.cookie('auth_user');

		if (!Ember.isEmpty(accessToken) && !Ember.isEmpty(authUserId)) {
			this.authentication(accessToken, authUserId);
		}
	},

	isAuthenticated: function() {
		return !Ember.isEmpty(this.get('apiKey.accessToken')) && !Ember.isEmpty(this.get('apiKey.user'));
	},

	authenticate: function(accessToken, userId) {
		$.ajaxSetup({
			headers: { 'Authorization': 'Bearer ' + accessToken }
		});

		var user = User.find(userId);
		this.set('apiKey', window.App.ApiKey.create({
			accessToken: accessToken,
			user: user 
		}));
	},

	reset: function() {
		window.App.__container__.lookup("route:application").transitionTo('sessions.new');
		Ember.run.sync();
		Ember.run.next(this, function() {
			this.set('apiKey', null);
			$.ajaxSetup({
				headers: { 'Authorization': 'Bearer none' }
			});
		});
	},

	apiKeyObserver: function() {
		if (Ember.isEmpty(this.get('apiKey'))) {
			$.removeCookie('access_token');
			$.removeCookie('auth_user');

		} else {
			$.cookie('access_token', this.get('apiKey.accessToken'));
			$.cookie('auth_user', this.get('apiKey.user.id'));
		}
	}.observes('apiKey')
});

DS.rejectionHandler = function(reason) {
	if (reason.status === 401) {
		window.App.AuthManager.reset();
	}
	throw reason;
};
