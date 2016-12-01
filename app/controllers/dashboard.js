import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	filter: 'all',
	search: null,
	course: null,
	showNewUploadModal: false,
        showNewCourseModal: false,
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
		submitForm(formData) {
			console.log("submitting form in controller:", formData);
			this.createNewUpload(formData);
				
		},
		//here, we need to gather all the filter info in order to update the model correctly
		//things to consider are the filter type, and either the course name or the user input to the search box 
		updateModel() {
			var self = this;
			self.buildQueryHash().then(function(queryHash) {
				self.set("model", self.get("store").query("upload", queryHash));
			})
		},
		openNewUploadModal() {
			this.set("showNewUploadModal", true);
		},
		openNewCourseModal() {
			this.set("showNewCourseModal", true);
		},
		closeNewUploadModal() {
			this.set("showNewUploadModal", false);
		},
		closeNewCourseModal() {
			this.set("showNewCourseModal", false);
		},
		chooseClass(course) {
			console.log("course chosen: ", course);
			this.set("course", course);
			this.send("updateModel");

		},
		updateFilter(search) {
			console.log("updating my filter");
			this.set("search", search);
			this.send("updateModel");
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
	createNewUpload(formData) {
		console.log("formData:", formData);
		var upload = this.get("store").createRecord("upload", formData);
		upload.save();

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
			if(self.get("filter") == "course" && self.get("course")) {
				queryHash["course"] = self.get("course");
			} else if(self.get("filter") == "mine") {
				queryHash["mine"] = true;
				if(self.get("search")) {
					queryHash["search"] = self.get("search");
				}
			} else {
				if(self.get("search")) {
					queryHash["search"] = self.get("search")
				}
			}
			resolve(queryHash);
		});
		return promise;
	}
});
