import Ember from 'ember';

export default Ember.Controller.extend({
	formOpen: false,
	actions: {
		closeUploadForm() {
			this.set("formOpen", false);
		},
		openUploadForm() {
			this.set("formOpen", true);
		}
	}
});
