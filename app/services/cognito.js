import Ember from 'ember';

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	//authenticate, invalidate, isExpired, refreshCreds
	authenticate() {
		if(this.credsExpired()) {
			this.refreshCreds();
		}
	},
	getCreds() {
		if(this.credsExpired()) {
			this.refreshCreds();
		}
		return JSON.parse(Cookies.get("cognito_creds")); 
	},


	// logout (remove the cookie(s))
	invalidate() {
		Cookies.remove("cognito_creds");
	},
	credsExpired() {
		return (Cookies.get("cognito_creds") == null);
	},
	refreshCreds() {
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
			AWS.config.credentials.get(function() {
				var date = new Date(AWS.config.credentials.expireTime);
				Cookies.set("cognito_creds", { accessKeyId: AWS.config.credentials.accessKeyId, secretAccessKey: AWS.config.credentials.secretAccessKey }, { expires: date } );
			});
		})
	},
});
