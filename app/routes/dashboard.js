import Ember from 'ember';
import $ from 'npm:jquery';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	session: Ember.inject.service('session'),
	
	model: function(params) {
		return this.get('store').findAll("upload");
	},
	actions: {
		logout() {
			this.get('session').invalidate();
		},
	},
});
