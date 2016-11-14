import Ember from 'ember';

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	authenticate() {
		// get the session data
		// hit the server for a token
		// create the creds using the token
		// set the cookie 
		// possibly return the creds in a promise? 
		var self = this;
		this.getSessionData().then(function(sessionData) {
			var authorization = "Token token = '" + sessionData.userName + "', email='" + sessionData.sessionToken + "'";
			return self.get("ajax").request('/cognito', {
				method: 'GET',
				dataType: 'json',
				headers: { "Authorization": authorization }
			});
		}).then(function(response) {
			console.log("token: ", response);
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
				self.set("expires", date );
			})


		});
		

	},
	getCreds() {

	},
	noCreds() {
		return (Cookies.get("cognito_creds") == null);
	},
	getSessionData() {
		var self = this;
		var promise = new Promise(function(resolve, reject) {
			resolve({userName: self.get('session').userName(), sessionToken: self.get('session').sessionToken()})
		});
		return promise;
	},
	printSessionData(data) {
		console.log("session data:", data);
	},
	getTokenFromBackend(sessionData) {
		console.log("session data:", sessionData);
		var self = this;
		var authorization = "Token token = '" + sessionData.userName + "', email='" + sessionData.sessionToken + "'";
		var response = self.get("ajax").request("/cognito", {
			method: 'GET',
			dataType: 'json',
			headers: { 'Authorization': authorization }
		});

	},
});
