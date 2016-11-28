import Ember from 'ember';

export default Ember.Component.extend({
	courses: [],
       	store: Ember.inject.service(),
	init() {
		this._super(...arguments);
		this.set("courses", this.get("store").findAll("course"));
	}
});
