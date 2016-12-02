import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['new-upload-modal'],
	session: Ember.inject.service(),
        ajax: Ember.inject.service(),	
	cognito: Ember.inject.service(),
        name: '',
        course: '',
        files: Ember.A([]),
        actions: {
		// we put all the file upload action here
		submitForm() {
			var self = this;
			this.collectFormInput().then(function(formData) {
				// do the upload here instead
				console.log("whatup hers' the form data: ", formData);
				self.createNewUpload(formData);
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
	},
	createNewUpload(formData) {
		var ajax = this.get("ajax");
		var sessionToken = this.get("session").sessionToken();
		var userName = this.get("session").userName();
		var authorization = "Token token=\"" + sessionToken + "\", email=\"" + userName + "\""; 
		var data = new FormData();
		data.append("name", formData.name);
		data.append("course", formData.course);
		data.append("files", formData.file.length);
		for(var i = 0;i < formData.file.length;i++) {
			data.append("file-" + i, formData.file[i]);
		}
		ajax.request("/uploads", {
			method: 'POST',
			data: data, 
			headers: {"Authorization": authorization },
			contentType: false,
			processData: false
		});
	},
	uploadToS3(formData) {
		var self = this;
		var AWS = window.AWS;
		this.get("cognito").getCreds().then(function(creds) {
			AWS.config.region = 'us-west-2';
			AWS.config.accessKeyId = creds.data.accessKeyId;
			AWS.config.secretAccessKey = creds.data.secretAccessKey;

			AWS.config.sessionToken = creds.data.sessionToken;
			var s3 = new AWS.S3({
				params: { Bucket: "test-bank-assets"}
			});
		})

	}
});
