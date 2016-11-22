import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'nav',
	classNames: ['navbar', 'uploads-navbar'],
	newUploadModal: false,
	actions: {
		openNewUploadModal() {
			this.sendAction("openNewUploadModal");
		},
		closeNewUploadModal() {
			this.sendAction("closeNewUploadModal");
		}

	}

});
