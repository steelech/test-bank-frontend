import Ember from 'ember';
import $ from 'npm:jquery';

export default Ember.Component.extend({
	ajax: Ember.inject.service(),
	actions: {
		selectSignIn() {
			console.log("sign in");
			$('li.register-tab').removeClass('modal-tab-selected').addClass("modal-tab-unselected");
			$('li.sign-in-tab').removeClass("modal-tab-unselected").addClass("modal-tab-selected");
			
		},
		selectRegister() {
			console.log("register");
			$('li.sign-in-tab').removeClass('modal-tab-selected').addClass("modal-tab-unselected");
			$('li.register-tab').removeClass("modal-tab-unselected").addClass("modal-tab-selected");

		}
	}
});
