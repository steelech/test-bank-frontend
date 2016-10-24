import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),
	didInsertElement: function() {
		var self = this;
		this.get('session').authorize('authorizer:devise', (headerName, headerValue) => {
			const headers = {};
			headers[headerName] = headerValue;
			this.$(".file-uploader").fileupload({
				formData: {email: this.get('session').currentUser.email },
				method: 'POST',
				url: 'http://localhost:3000/uploads',
				singleFileUploads: false,
				headers: headers,
				done: function(e, data) {
					var result = data.result;
					alert(result.identity_id);
				}
			});
		})
	}
});
