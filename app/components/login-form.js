import Ember from 'ember';

const { service } = Ember.inject;
export default Ember.Component.extend({
	session: service('session'),
	cognito: service('cognito2'),
	actions: {
		// probably do some cognito stuff in here
		authenticate: function() {
			var AWS = window.AWS;
			let { identification, password } = this.getProperties('identification', 'password');
			//this.get("cognito").authenticate();
			this.get('session').authenticate('authenticator:devise', identification, password).then(() => {
				this.get("cognito").authenticate();
			}, (err) => {
				alert("Error");
			});
		},
	}
});
