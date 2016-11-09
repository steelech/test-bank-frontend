import Ember from 'ember';
import fileupload from 'npm:blueimp-file-upload';
import $ from 'npm:jquery';
export default Ember.Component.extend({
	session: Ember.inject.service('session'),
	//didInsertElement: function() {
		//this.get('session').authorize('authorizer:devise', (headerName, headerValue) => {
		//	const headers = {};
		//	console.log($(".hidden-email").val());
		//	headers[headerName] = headerValue;
		//	$(".file-uploader").fileupload({
		//		method: 'POST',
		//		url: 'http://localhost:3000/uploads',
		//		singleFileUploads: false,
		//		headers: headers,
		//		submit: function(e, data) {
		//			data.formData = {user: $('input#hidden-email').val(), course: $('input#course').val(), name: $('input#name').val()  };
		//			data.jqXHR =$(this).fileupload('send', data);
		//			return false;	



		//		},
		//		done: function(e, data) {
		//			var result = data.result;
		//			alert(result.identity_id);
		//		}
		//	});
		//})
//	}
	didInsertElement: function() {
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
					console.log("hi");
				},
				submit: function(e, data){
					console.log("submit");
				}
			})
		})
	}		
});
