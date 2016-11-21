import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	formOpen: false,
	model: function(params) {
		return this.get('store').findAll("upload");

	},
	actions: {
		closeUploadForm() {
			this.set("formOpen", false);
		},
		openUploadForm() {
			this.set("formOpen", true);
			console.log("hi");
		}
	}
});
