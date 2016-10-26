import Ember from 'ember';

export default Ember.Component.extend({
	session: Ember.inject.service(),
	name: '',
	course: '',
	fileList: [],
	showFiles: Ember.computed('fileList', function() {
		return this.get("fileList");
	}),
	didInsertElement: function() {
		var self = this;
		this.get('session').authorize('authorizer:devise', (headerName, headerValue) => {
			const headers = {};
			headers[headerName] = headerValue;
			$('.file-uploader').fileupload({
				autoUpload: false,
				method: 'POST',
				url: 'http://localhost:3000/uploads',
				singleFileUploads: false,
				headers: headers,
				add: function(e, data) {
					var list = self.get("fileList");
					$.each(data.files, function(index,file) {
						list.push(file);
					});
					self.set("fileList", list);
				},
				change: function(e, data) {
					$.each(data.files, function(index, file) {
						$('ul#show-files').append("<li>" + file.name + "</li>");

					});

				},
				submit: function(e, data){
				},
				done: function(e, data) {
					self.sendAction("closeModalDialog");	
				}
			});

		})
	},		
	actions: {
		submitForm() {
			var self = this;
			$('.file-uploader').fileupload("send", {
				files: self.get("fileList"),
				formData: {email: $('input#hidden-email').val(), course: $("input#course").val(), name: $("input#name").val() },
			});
		}
	}
});
