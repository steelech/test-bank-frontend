import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	session: Ember.inject.service(), 
	formOpen: false,
	actions: {
		openUploadForm() {
			console.log("opening upload form");
			this.set("formOpen", true);
		},
		closeModalDialog() {
			this.set("formOpen", false);
		},
		submitForm(name, course) {
			var upload = this.get("store").createRecord('upload', {
				name: name,
				course: course,
				user: this.get("session").get("currentUser").email, 

			});
			upload.save();

		}
	}
	
});
