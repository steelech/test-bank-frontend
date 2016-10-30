import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),
	ajax: Ember.inject.service(),
	actions: {
		logout() {
			this.get('session').invalidate();
		},
		viewImage() {
			// get an identity_id and a token from the backend
			this.get("ajax").request('/cognito', {
				method: 'GET',
				dataType: 'json',
			}).then(function(response) {
				// use the id and token to create temporary credentials
				var AWS = window.AWS;
				AWS.config.region = "us-west-2";
				AWS.config.credentials = new AWS.CognitoIdentityCredentials({
					IdentityPoolId: 'us-west-2:956f2a12-44f6-4adb-906e-c0fc4c103649',
					IdentityId: response.identity_id,
					Logins: {
						'cognito-identity.amazonaws.com': response.token
					}
				});
				// refreshes credentials using AWS.STS.assumeRoleWithWebIdentity, callback
				AWS.config.credentials.get(function() {
					var s3 = new AWS.S3({
						params: { Bucket: 'test-bank-assets' }
					});
					var params = { Key: 'combined' };
					var url = s3.getSignedUrl('getObject', params);
					window.open(url);
				});
			});
		}
	}
});
