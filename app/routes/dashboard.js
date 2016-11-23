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
			var self = this;

			//if(type == 'all') {
				//this.setAllActive();
			//} else if(type == 'mine') {
				//this.setMineActive();
			//} else {
				//this.setByCourseActive();
			//}
			//
			var self = this;
			this.removeSelected(type, self).then(function(array) {
				self.stylingTouches(array);
			});
		}
	},
	setFilterStyling(type) {
		
		// we want to try and set the styling of the selected tab and the unselected tabs all in one function without the code being too ugly
		// we need to base our actions off of 'type'
		//
			
	},
	removeSelected(selected, self) {
		var array = ['all', 'mine', 'course']
		var finalArray = [];
		var self = this;
		var promise = new Promise(function(resolve, reject) {
			for(var i = 0;i < array.length;i++) {
				if(selected != array[i]) {
					finalArray.push(array[i]);
				}
			}
			finalArray.push(selected);
			resolve({array: finalArray});
		});
		return promise;

	},
	stylingTouches(newTabs) {
		// the first two are unselected, the third is selected
		var prefix = '.uploads-';
		var suffix = '-filter';
		var tabs = newTabs.array;
		for(var i = 0;i < tabs.length - 1;i++) {
			var selector = prefix + tabs[i] + suffix;
			$(selector).attr("id", "uploads-navbar-text-unselected");
		}
		var selector = prefix + tabs[tabs.length - 1] + suffix;
		$(selector).attr("id","uploads-navbar-text-selected");
	}
});
