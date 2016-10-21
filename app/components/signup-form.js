import Ember from 'ember';


export default Ember.Component.extend({
	ajax: Ember.inject.service(),
	actions: {
		register: function() {
			// need to modify this to check if the password matches the confirmation before sending it
			let { identification, password, confirmation } = this.getProperties('identification', 'password', 'confirmation');
			return this.get('ajax').request('/users', {
				method: 'POST',
				dataType: 'json',
				contentType: 'application/json',
				data: JSON.stringify({
					identification: identification,
					password: password,
					confirmation: confirmation
				})
			});
		}
	}
});
