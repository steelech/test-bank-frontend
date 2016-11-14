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
		// need to make a call to get the creds (we should take care of making sure theyre valid in the service instead of here)	
		// we have some refactoring to do: we need to make a call to our cognito service to get the creds 
			// call getCreds, which returns a promise and then link it (.then so that the call to s3 doesn't happen til it's resolved or rejected) 
			AWS.config.accessKeyId = this.get("cognito").accessKeyId;
			AWS.config.secretAccessKey = this.get("cognito").secretAccessKey;
			AWS.config.sessionToken = this.get("cognito").awsSessionToken;
			AWS.config.region = "us-west-2";
			console.log("AWS config:", AWS.config);	
			var s3 = new AWS.S3({
				params: { Bucket: "test-bank-assets" }
			});

			var params = { Key: 'combined' };
			var url = s3.getSignedUrl('getObject', params);
			window.open(url);
		}
	}
});
