import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),
	ajax: Ember.inject.service(),
	actions: {
		logout() {
			this.get('session').invalidate();
		},
		viewImage() {
			// need to make a GET to /cognito and get back a response with token and identity_id keys
			// gonna need to use a promise object	
			this.get("ajax").request('/cognito', {
				method: 'GET',
				dataType: 'json',
			}).then(function(response) {
				var AWS = window.AWS;
				AWS.config.credentials = new AWS.CognitoIdentityCredentials({
					IdentityPoolId: 'us-west-2:956f2a12-44f6-4adb-906e-c0fc4c103649',
					IdentityId: response.identity_id,
					Logins: {
						'cognito-identity.amazonaws.com': response.token
					}
				});
				AWS.config.credentials.get(function() {
					console.log(AWS.config.credentials);
					
					var s3 = new AWS.S3({
						params: { Bucket: 'test-bank-assets' }
					});
					console.log(AWS.config.credentials.accessKeyId);
					console.log(AWS.config.credentials.secretAccessKey);
					var params = { Key: 'combined' };
					var url = s3.getSignedUrl('getObject', params);
					console.log("The URL is ", url);

				});
			});

			//var s3 = new AWS.S3({params: {Bucket: 'test-bank-assets'}});
		}


	}
});
