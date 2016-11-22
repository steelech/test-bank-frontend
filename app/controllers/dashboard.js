import Ember from 'ember';

export default Ember.Controller.extend({
	showNewUploadModal: false,

	actions: {
		openNewUploadModal() {
			console.log("opening modal in controller");
			this.set("showNewUploadModal", true);
		},
		closeNewUploadModal() {
			console.log("closing modal in controller");
			this.set("showNewUploadModal", false);
		}
	}
});
