import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['new-upload-modal'],
        name: '',
        course: '',
        actions: {
		submitForm() {
			var self = this;
			this.collectFormInput().then(function(formData) {
				self.sendAction("submitForm", formData);
			});
		},
	},
        collectFormInput() {
		var formData = {};
		var self = this;
		var promise = new Promise(function(resolve, reject) {
			if(self.get("course")) {
				formData["course"] = self.get("course");
			}
			if(self.get("name")) {
				formData["name"] = self.get("name");
			}
			resolve(formData);
		});
		return promise;
	}
});
