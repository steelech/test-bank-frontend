import Ember from 'ember';

export default Ember.Component.extend({
       	store: Ember.inject.service(),
        courses: null,
        value: null,
        didInsertElement() {
		var self = this;
		var myCourses = Ember.A([]);
		this.get("store").findAll("course").then((courses) => {
			var coursesArray = courses.toArray();
			var i;
			for(i = 0;i < coursesArray.length;i++) {
				myCourses.push(coursesArray[i].data.name);
			}
			self.set("courses", myCourses);
		});
	},
        actions: {
		chooseClass() {
			console.log("value:", this.get("value"));
			this.sendAction("chooseClass", this.get("value"));
		}
	},
});
