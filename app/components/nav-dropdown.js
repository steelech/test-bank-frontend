import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service(),
	tagName: 'li',
	user: '',
	init() {
		this._super(...arguments);

	},
	actions: {
		logout() {
			this.get('session').invalidate();
		}
	}
});
