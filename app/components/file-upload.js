import Ember from 'ember';
import $ from 'npm:jquery';

export default Ember.Component.extend({
	classNames: ['file-upload'],
	didInsertElement() {
		var self = this;
		console.log("loaded page");
		var dragAndDrop = $('#draganddrophandler');
		var fileBrowse = $("#file-browse");

		fileBrowse.on('change', function(e) {
			console.log("file picked!");
		});
		dragAndDrop.on('dragenter', function(e) {
			e.stopPropagation();
			e.preventDefault();
			console.log("dragenter");
		});

		dragAndDrop.on('dragover', function(e) {
			e.stopPropagation();
			e.preventDefault();
			console.log("dragover");
		});

		dragAndDrop.on('drop', function(e) {
			e.preventDefault();
			console.log("dropped!");
			var files = e.originalEvent.dataTransfer.files;
			self.handleFileUpload(files);


		});
	},
	handleFileUpload(files) {
		console.log("files: ", files);
	}

});
