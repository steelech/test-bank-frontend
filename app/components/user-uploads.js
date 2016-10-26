import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	session: Ember.inject.service(), 
	formOpen: false,
	actions: {
		openUploadForm() {
			this.set("formOpen", true);
		},
		closeModalDialog() {
			this.set("formOpen", false);
		},
		
	}
	
});
