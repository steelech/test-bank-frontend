import Ember from 'ember';

export default Ember.Component.extend({
	name: '',
	actions: {
		submitForm() {
			var self = this;
			this.collectFormData().then(function(formData) {
				self.sendAction("newCourseForm", formData);
			});
		}
	},
        collectFormData() {
		var self = this;
		var promise = new Promise(function(resolve, reject) {
			var formData = {};
			if(self.get("name")) {
				formData["name"] = self.get("name");
			}
			resolve(formData);
		});
		return promise;
	}
});
