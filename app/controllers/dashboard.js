import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	filter: 'all',
	showNewUploadModal: false,
	filterComponentName: Ember.computed('filter', {
		get() {
			if(this.get("filter") == "course") {
				return 'course-filter';
			} else {
				return 'gen-filter';
			}
		}
	}),

	actions: {

		openNewUploadModal() {
			this.set("showNewUploadModal", true);
		},
		closeNewUploadModal() {
			this.set("showNewUploadModal", false);
		},
		
		setFilterType(type) {
			var self = this;
			this.set("filter", type);
			self.removeSelected(type, self).then(function(array) {
				self.styleTabs(array);
			});
		},

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
	styleTabs(newTabs) {
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
