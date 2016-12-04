import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['new-upload-modal'],
	session: Ember.inject.service(),
        ajax: Ember.inject.service(),	
	cognito: Ember.inject.service(),
	store: Ember.inject.service(),
        name: '',
        course: '',
        files: Ember.A([]),
        actions: {
		// we put all the file upload action here
		submitForm() {
			var self = this;
			this.collectFormInput().then(function(formData) {
				if(formData.file.length == 1) {
					self.singleFileUpload(formData);
				} else {
					self.multiFileUpload(formData);
				}
			});
		},
       		addFiles(files) {
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
	multiFileUpload(formData) {
		var self = this;
		var ajax = this.get("ajax");
		var sessionToken = this.get("session").sessionToken();
		var key = formData.name.toLowerCase().replace(" ", "") + formData.course.toLowerCase().replace(" ", "");
		var userName = this.get("session").userName();
		var authorization = "Token token=\"" + sessionToken + "\", email=\"" + userName + "\""; 
		var data = new FormData();
		data.append("name", formData.name);
		data.append("course", formData.course);
		data.append("files", formData.file.length);
		data.append("file_type", formData.file[0].type);
		for(var i = 0;i < formData.file.length;i++) {
			data.append("file-" + i, formData.file[i]);
		}
		ajax.request("/uploads", {
			method: 'POST',
			data: data, 
			headers: {"Authorization": authorization },
			contentType: false,
			processData: false
		}).then(function(results) {
			
			var newUpload = self.get("store").createRecord("upload", {
				name: formData.name,
				course: formData.course,
				file_type: formData.file[0].type,
				s3_key: key
			});
			self.sendAction("close");
		});
	},
	singleFileUpload(formData) {
		this.uploadToS3(formData);
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
			// write key here
			var key = formData.name.toLowerCase().replace(" ", "") + formData.course.toLowerCase().replace(" ", "");
			console.log("filetype:", formData.file[0].type);
			var params = {
				Key: key,
				ContentType: formData.file[0].type,
				Body: formData.file[0]
			}

			s3.putObject(params, function(err, data) {
				if(err) {
					console.log("bad upload");
				} else {
					// create upload on backend using name and course
					console.log("good upload", data);
					var fileRecord = self.get("store").createRecord("upload", {name: formData.name, course: formData.course, s3_key: key, file_type: formData.file[0].type});
					fileRecord.save();
					self.sendAction("close");
				}
			});
		});
	}
});
