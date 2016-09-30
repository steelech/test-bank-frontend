import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
	url: "http://localhost:3000/sign",
	filesDidChange: function() {
		let uploadUrl = this.get("url");
		var files = this.get("files");
		console.log(this.get("url"));
		var uploader = EmberUploader.S3Uploader.create({
			url: this.get("url")
		});

		if(!Ember.isEmpty(files)) {
			uploader.upload(files[0]);

		}	
		
		uploader.on('didUpload', e => {
			alert("upload successful");
		});
	}.observes('files')
});
