import Ember from 'ember';

const { service } = Ember.inject;
export default Ember.Component.extend({
	session: service('session'),
	actions: {
		authenticate: function() {
			var AWS = window.AWS;
			let { identification, password } = this.getProperties('identification', 'password');
			return this.get('session').authenticate('authenticator:devise', identification, password).then(() => {
				console.log(this.get("session").get("data").authenticated.token);
				console.log(this.get("session").get("data").authenticated.email);

			}, (err) => {
				alert("Error");
			});
			
			
		},
		authenticationSucceeded(params) {
			console.log(params);
		}
	}
});
