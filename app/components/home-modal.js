import Ember from 'ember';
import $ from 'npm:jquery';

export default Ember.Component.extend({
	ajax: Ember.inject.service(),
	signIn: true,
	register: false,
	actions: {
		selectSignIn() {
			$('li.register-tab').removeClass('modal-tab-selected').addClass("modal-tab-unselected");
			$('li.sign-in-tab').removeClass("modal-tab-unselected").addClass("modal-tab-selected");
			this.set("signIn", true);
			this.set("register", false);
			
		},
		selectRegister() {
			$('li.sign-in-tab').removeClass('modal-tab-selected').addClass("modal-tab-unselected");
			$('li.register-tab').removeClass("modal-tab-unselected").addClass("modal-tab-selected");
			this.set("register", true);
			this.set("signIn", false);

		}
	}
});
