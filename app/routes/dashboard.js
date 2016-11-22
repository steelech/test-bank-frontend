import Ember from 'ember';
import $ from 'npm:jquery';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	session: Ember.inject.service('session'),
	filter: 'all',
	
	model: function(params) {
		return this.get('store').findAll("upload");

	},

	actions: {
		logout() {
			this.get('session').invalidate();
		},
		setFilterType(type) {

			//if(type == 'all') {
				//this.setAllActive();
			//} else if(type == 'mine') {
				//this.setMineActive();
			//} else {
				//this.setByCourseActive();
			//}
			this.removeSelected(type);
		}
	},
	setFilterStyling(type) {
		
		// we want to try and set the styling of the selected tab and the unselected tabs all in one function without the code being too ugly
		// we need to base our actions off of 'type'
		//
			
	},
	setAllActive() {
		$('.uploads-all-filter').attr('id', 'uploads-navbar-text-selected');
		$('.uploads-mine-filter').attr('id', 'uploads-navbar-text-unselected');
		$('.uploads-course-filter').attr('id', "uploads-navbar-text-unselected");
	},
	setMineActive() {
		$('.uploads-all-filter').attr('id', 'uploads-navbar-text-unselected');
		$('.uploads-mine-filter').attr('id', 'uploads-navbar-text-selected');
		$('.uploads-course-filter').attr('id', "uploads-navbar-text-unselected");
	},
	setByCourseActive() {
		$('.uploads-all-filter').attr('id', 'uploads-navbar-text-unselected');
		$('.uploads-mine-filter').attr('id', 'uploads-navbar-text-unselected');
		$('.uploads-course-filter').attr('id', "uploads-navbar-text-selected");
	},
	removeSelected(selected) {
		var options = ['all', 'mine', 'course'];
		var array = [];
		var len = options.length;
		for (var i=0;i<len;i++) {
			if(options[i] != selected) {
				array.push(options[i]);
			}
		}
		array.push('selected');
		$('uploads' + array[0] + 'filter').attr('id', 'uploads-navbar-text-unselected');
		$('uploads' + array[1] + 'filter').attr('id', 'uploads-navbar-text-unselected');
		$('uploads', + array[2] + 'filter').attr('id', 'uploads-navbar-text-selected');

	}
});
