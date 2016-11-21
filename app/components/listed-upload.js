import Ember from 'ember';

export default Ember.Component.extend({
	uploadModal: false,
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
			console.log("viewing upload");

		}
	}
});
