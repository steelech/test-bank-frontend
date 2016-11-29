import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	filter: 'all',
	search: null,
	course: null,
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
		//here, we need to gather all the filter info in order to update the model correctly
		//things to consider are the filter type, and either the course name or the user input to the search box 
		updateModel() {
			var self = this;
			self.buildQueryHash().then(function(queryHash) {
				self.set("model", self.get("store").query("upload", queryHash));
			})
			console.log("updating model");
		},
		openNewUploadModal() {
			this.set("showNewUploadModal", true);
		},
		closeNewUploadModal() {
			this.set("showNewUploadModal", false);
		},
		chooseClass(params) {
			console.log("params", params);
		},
		
		setFilterType(type) {
			var self = this;
			this.set("filter", type);
			this.send("updateModel");
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
		var prefix = '.uploads-';
		var suffix = '-filter';
		var tabs = newTabs.array;
		for(var i = 0;i < tabs.length - 1;i++) {
			var selector = prefix + tabs[i] + suffix;
			$(selector).attr("id", "uploads-navbar-text-unselected");
		}
		var selector = prefix + tabs[tabs.length - 1] + suffix;
		$(selector).attr("id","uploads-navbar-text-selected");
	},
	buildQueryHash() {
		var self = this;
		var promise = new Promise(function(resolve, reject) {
			var queryHash = {};
			// builds the hash to be sent to this.get("store").query("uploads", )
			if(self.get("filter") == "all") {
				//just care about setting the search param
				console.log("all");
			} else if(self.get("filter") == "mine") {
				// need to set search param as well as 'mine' param
				console.log("mine");
			} else {
				// need to set course param
				console.log("by course");

			}
			resolve(queryHash);
		});
		return promise;
	}
});
