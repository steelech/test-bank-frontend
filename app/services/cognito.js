import Ember from 'ember';

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	// hit backend for token, get temporary creds, store in cookie
	authenticate() {
		var self = this;
		return this.getSessionData()
			.then(function(sessionData) {
				return self.getTokenFromBackend(sessionData);
			})
			.then(function(response) {
				return self.setCreds(response);
			})
	},
	// returns a promise object containing the credentials
	// refreshes them if needed
	getCreds() {
		var self = this;
		var promise = new Promise(function(resolve, reject) {
			// 
			if(self.noCreds()) {
				//call authenticate to get new creds
				self.authenticate().then(function(creds) {
					resolve({data: creds})
				});
			} else {
				// use the creds in the cookie
				resolve({data: JSON.parse(Cookies.get("cognito_creds"))});

			}
		});
		return promise;

	},
	// uses a token from the backend to create temporary creds, and sets a cookie containing them
	setCreds(response) {
			var self = this;
			var AWS = window.AWS;
			return self.getCredsObject(response).then(function(creds) {
					return self.saveCreds(creds);
			})
	},
	// returns the raw CognitoIdentityCredentials object used for the temp creds
	getCredsObject(response) {
		var promise = new Promise(function(resolve, reject) {
			var creds = new AWS.CognitoIdentityCredentials({
				IdentityPoolId: 'us-west-2:956f2a12-44f6-4adb-906e-c0fc4c103649',
				IdentityId: response.identity_id,
				Logins: {
					'cognito-identity.amazonaws.com': response.token
				}
			});
			resolve({ creds_object: creds });
		});
	       return promise;	
	},
	// refreshes AWS credentials using cognito credentials object, sets cookie to new credentials
	saveCreds(creds) {
		var AWS = window.AWS;
		var self = this;
		AWS.config.region = "us-west-2";
		AWS.config.credentials = creds.creds_object;
		var promise = new Promise(function(resolve, reject) {
			AWS.config.credentials.get(function() {
				var date = new Date(AWS.config.credentials.expireTime);
				Cookies.set("cognito_creds", { accessKeyId: AWS.config.credentials.accessKeyId, secretAccessKey: AWS.config.credentials.secretAccessKey, sessionToken: AWS.config.credentials.sessionToken }, { expires: date } );
				resolve({ accessKeyId: AWS.config.credentials.accessKeyId, secretAccessKey: AWS.config.credentials.secretAccessKey, sessionToken: AWS.config.credentials.sessionToken })
			});
		});
		return promise;
	},
	// returns true if the creds cookie has expired
	noCreds() {
		return (Cookies.get("cognito_creds") == null);
	},
	// gets the session data which will be used for setting the authorization header 
	// in ajax request
	getSessionData() {
		var self = this;
		var promise = new Promise(function(resolve, reject) {
			resolve({userName: self.get('session').userName(), sessionToken: self.get('session').sessionToken()})
		});
		return promise;
	},
	// hits our backend for a token to be used for cognito creds
	getTokenFromBackend(sessionData) {
		var self = this;
		var authorization = "Token token=\"" + sessionData.sessionToken + "\", email=\"" + sessionData.userName + "\"";
		return self.get("ajax").request('/cognito', {
			method: 'GET',
			dataType: 'json',
			headers: { "Authorization": authorization }
		});
	},
});

