import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service('session'),
	didInsertElement: function() {
		self = this;
		this.$(".file-uploader").fileupload({
			method: 'POST',
			url: 'http://localhost:3000/uploads',
			singleFileUploads: false

		});
	}
});
