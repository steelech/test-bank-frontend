import Ember from 'ember';

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	userName: '',
	awsSessionToken: '',
	accessKeyId: '',
	secretAccessKey: '',
	deviseSessionToken: '',
	init() {
		this._super(...arguments);
		this.set("userName", this.get("session").userName());
		this.set("deviseSessionToken", this.get("session").sessionToken());
		if(this.credsExpired()) {
			this.refreshCreds();
		} else {
			this.set("awsSessionToken", JSON.parse(Cookies.get("cognito_creds")).sessionToken);
			this.set("accessKeyId", JSON.parse(Cookies.get("cognito_creds")).accessKeyId);
			this.set("secretAccessKey", JSON.parse(Cookies.get("cognito_creds")).secretAccessKey);
		} 
	},


	//authenticate, invalidate, isExpired, refreshCreds
	authenticate(userName) {
		if(this.credsExpired()) {
			this.refreshCreds(userName);
		}
	},
	getCreds(userName) {
		console.log("getCreds");
	},


	// logout (remove the cookie(s))
	invalidate() {
		Cookies.remove("cognito_creds");
	},
	credsExpired() {
		return (Cookies.get("cognito_creds") == null);
	},
	refreshCreds(userName) {
		var self = this;
		this.get("ajax").request('/cognito', {
			method: 'GET',
			dataType: 'json',
			headers: {"Authorization": "Token asdf"}
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
				Cookies.set("cognito_creds", { accessKeyId: AWS.config.credentials.accessKeyId, secretAccessKey: AWS.config.credentials.secretAccessKey, sessionToken: AWS.config.credentials.sessionToken }, { expires: date } );
				self.set("awsSessionToken", AWS.config.credentials.sessionToken);
				self.set("accessKeyId", AWS.config.credentials.accessKeyId);
				self.set("secretAccessKey", AWS.config.credentials.secretAccessKey);
			});
		})
	},
});
