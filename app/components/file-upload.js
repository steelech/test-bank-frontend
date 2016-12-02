import Ember from 'ember';
import $ from 'npm:jquery';

export default Ember.Component.extend({
	classNames: ['file-upload'],
	didInsertElement() {
		console.log("loaded page");
		var dragAndDrop = $('#draganddrophandler');
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

		});
	}
});
