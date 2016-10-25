import Ember from 'ember';

export default Ember.Component.extend({
	name: '',
	course: '',
	actions: {
		submitForm() {
			this.sendAction("submitForm", this.get("name"), this.get("course"));
		}
	}
});
