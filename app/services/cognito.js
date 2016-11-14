import Ember from 'ember';

export default Ember.Service.extend({
	ajax: Ember.inject.service(),
	session: Ember.inject.service(),
	userName: '',
	awsSessionToken: '',
	accessKeyId: '',
	secretAccessKey: '',
	deviseSessionToken: '',
	expires: '',
	


	// authenticate: get session info, hit server for identity Id and token, get creds using Identity Id and Token, set cookie to creds, return creds
	// getCreds: check if creds are present.  If they are, return them.  If they aren't, authenticate


	//authenticate, invalidate, isExpired, refreshCreds
	authenticate(userName) {
			this.refreshCreds(userName);
	},
	// logout (remove the cookie(s))
	invalidate() {
		Cookies.remove("cognito_creds");
	},
	needCreds() {
		return true;
	},
	refreshCreds(userName) {
		// need to use promises so that anytime this function is called, the caller waits until everything executes to proceed
		// we probably need to chain these together, and also return a promise so that the caller can resolve it before trying to 
		// obtain the credentials
		// the overall function needs to return a promise
		console.log("refreshing credentials");
		var self = this;
		var authorization = "Token token='" + this.get("userName") + "', email='" + this.get("deviseSessionToken") + "'";
		this.get("ajax").request('/cognito', {
			method: 'GET',
			dataType: 'json',
			headers: {"Authorization": authorization}
		}).then(function(response) {
			console.log(response);
			console.log("suh, dude");
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
			// I think this is where the problem is occuring: AWS.config.credentials.get() runs 
			// before the credentials are set?
			AWS.config.credentials.get(function() {
				console.log("AWS.config.credentials.get()");
				var date = new Date(AWS.config.credentials.expireTime);
				Cookies.set("cognito_creds", { accessKeyId: AWS.config.credentials.accessKeyId, secretAccessKey: AWS.config.credentials.secretAccessKey, sessionToken: AWS.config.credentials.sessionToken }, { expires: date } );
				self.set("awsSessionToken", AWS.config.credentials.sessionToken);
				self.set("accessKeyId", AWS.config.credentials.accessKeyId);
				self.set("secretAccessKey", AWS.config.credentials.secretAccessKey);
				self.set("expires", date );
			});
		})
	},
	getCreds() {

	}
});
