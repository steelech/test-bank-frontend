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
		},
       		openNewCourseModal() {
			this.sendAction("openNewCourseModal");
		},
       		closeNewCourseModal() {
			this.sendAction("closeNewCourseModal");
		},
		setAll() {
			this.sendAction("setFilterType", "all");
		},
		setMyUploads() {
			this.sendAction("setFilterType", "mine");
		},
		setByCourse() {
			this.sendAction("setFilterType", "course");
		}

	}

});
