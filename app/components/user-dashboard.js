import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),
	ajax: Ember.inject.service(),
	cognito: Ember.inject.service('cognito'),
	actions: {
		logout() {
			this.get('session').invalidate();
			this.get('cognito').invalidate();
		},
		viewImage() {
			var self = this;
			var AWS = window.AWS;
			this.get("cognito").getCreds().then(function(creds) {
				AWS.config.region = 'us-west-2';
				AWS.config.accessKeyId = creds.data.accessKeyId;
				AWS.config.secretAccessKey = creds.data.secretAccessKey;
				AWS.config.sessionToken = creds.data.sessionToken;
				var s3 = new AWS.S3({
					params: { Bucket: "test-bank-assets" }
				});

				var params = { Key: 'combined' };
				var url = s3.getSignedUrl('getObject', params);
				window.open(url);
			})
		}
	}
});
