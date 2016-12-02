import Ember from 'ember';
import $ from 'npm:jquery';

export default Ember.Component.extend({
	classNames: ['file-upload'],
	files: null,
	didInsertElement() {
		var self = this;
		console.log("loaded page");
		var dragAndDrop = $('#draganddrophandler');
		var fileBrowse = $("#file-browse");

		fileBrowse.on('change', function(e) {
			var files = this.files;
			self.addToUploadsList(files);
		});
		dragAndDrop.on('dragenter', function(e) {
			e.stopPropagation();
			e.preventDefault();
		});

		dragAndDrop.on('dragover', function(e) {
			e.stopPropagation();
			e.preventDefault();
		});
		dragAndDrop.on('drop', function(e) {
			e.preventDefault();
			var files = e.originalEvent.dataTransfer.files;
			self.addToUploadsList(files);
		});
	},
	addToUploadsList(files) {
		var i;
		var newFiles = Ember.A([]);
		for(i=0;i < files.length;i++) {
			newFiles.push(files[i]);
		}
		this.sendAction("addFiles", newFiles);
	},
});
