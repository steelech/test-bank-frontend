import Ember from 'ember';
import $ from 'npm:jquery';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	session: Ember.inject.service('session'),
	filter: 'all',
	
	model: function(params) {
		return this.get('store').findAll("upload");

	},

	actions: {
		logout() {
			this.get('session').invalidate();
		},
		setFilterType(type) {
			if(type == 'all') {
				this.setAllActive();
			} else if(type == 'mine') {
				this.setMineActive();
			} else {
				this.setByCourseActive();
			}
		}
	},
	setAllActive() {
		console.log("setting 'All' as the active tab");
	},
	setMineActive() {
		console.log("setting 'My Uploads' as the active tab");
	},
	setByCourseActive() {
		console.log("setting 'By Course' as the active tab");
	}
});
