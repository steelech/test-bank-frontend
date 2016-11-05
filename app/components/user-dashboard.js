import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),
	ajax: Ember.inject.service(),
	cognito: Ember.inject.service(),
	actions: {
		logout() {
			this.get('session').invalidate();
			this.get('cognito').invalidate();
		},
		viewImage() {
			var AWS = window.AWS;
			var creds = this.get("cognito").getCreds();
			
			AWS.config.accessKeyId = creds.accessKeyId;
			AWS.config.secretAccessKey = creds.secretAccessKey;
			AWS.config.sessionToken = creds.sessionToken;
			AWS.config.region = "us-west-2";
			
			var s3 = new AWS.S3({
				params: { Bucket: "test-bank-assets" }
			});

			var params = { Key: 'combined' };
			var url = s3.getSignedUrl('getObject', params);
			window.open(url);
		}
	}
});
