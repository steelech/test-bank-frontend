import Ember from 'ember';

export default Ember.Component.extend({
	showUploadModal: false,
	iconClass: 'hidden',
	tagName: 'li',
	classNames: ['list-group-item', 'listed-upload'],
	over: false,
	actions: {
		over() {
			this.set("over", true);
			this.set("iconClass", "listed-upload-icon");
		},
		off() {
			this.set("over", false);
			this.set("iconClass", "hidden");
		},
		viewUpload() {
			this.set("showUploadModal", true);

		},
		closeUpload() {
			this.set("showUploadModal", false);
		}
	}
});
