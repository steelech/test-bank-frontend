import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		imageUploadComplete: function(details) {
			let fullUrl = details.fullUrl, key = details.key;
			console.log("fullUrl:", fullUrl);
			console.log("key:", key);
			alert("Upload complete!");
		},
	}
});
