import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['new-upload-modal'],
        name: '',
        course: '',
        files: Ember.A([]),
        actions: {
		submitForm() {
			var self = this;
			this.collectFormInput().then(function(formData) {
				self.sendAction("submitForm", formData);
			});
		},
       		addFiles(files) {
			console.log("adding files");
			if(this.get("files")) {
				var newFiles = this.get("files");
				var i;
				for(i=0;i<files.length;i++) {
					newFiles.push(files[i]);
				}
				this.set("files", newFiles);
				

			} else {
				this.set("files", files);
			}
			console.log("new files:", this.get("files"));
		}
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
			if(self.get("files")) {
				formData["file"] = self.get("files").toArray();
			}
			resolve(formData);
		});
		return promise;
	}
});
