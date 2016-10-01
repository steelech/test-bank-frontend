import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
	fileInfo: [],
	signingUrl: "http://localhost:3000/sign",
	serverUrl: "http://localhost:3000/uploads",
	multiple: true,
	onComplete: "onComplete",
	filesDidChange: function() {
		let signingUrl = this.get("signingUrl"),
			serverUrl = this.get("serverUrl"),
			files = this.get("files"),
			_this = this,
			serverUploader = EmberUploader.Uploader.create({
				url: serverUrl
			}),
			s3Uploader = EmberUploader.S3Uploader.create({
				url: signingUrl
			});
		if(!Ember.isEmpty(files)) {

			if(files.length == 1) {
				s3Uploader.upload(files[0]);
			} else {
				console.log("multiple files detected");
				serverUploader.upload(files);
			}

			console.log(files);
				
		}
		s3Uploader.on('didUpload', function(response) {
			let res = $(response),
				fullUrl = decodeURIComponent(res.find('Location')[0].textContent),
				key = decodeURIComponent(res.find('Key')[0].textContent);
		 	_this.sendAction('onComplete', {fullUrl: fullUrl, key: key});	
		});

	}.observes('files'),

});
