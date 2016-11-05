import Ember from 'ember';

const { service } = Ember.inject;
export default Ember.Component.extend({
	session: service('session'),
	cognito: service('cognito'),
	actions: {
		// probably do some cognito stuff in here
		authenticate: function() {
			var AWS = window.AWS;
			let { identification, password } = this.getProperties('identification', 'password');
			//this.get("cognito").authenticate();
			this.get("cognito").authenticate();
			return this.get('session').authenticate('authenticator:devise', identification, password).then(() => {
			}, (err) => {
				alert("Error");
			});
		},
	}
});
