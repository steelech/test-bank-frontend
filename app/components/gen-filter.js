import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['gen-filter'],
        search: '',
        actions: {
		updateFilter() {
			console.log("updating filter");
			console.log("search: ", this.get("search"));
			this.sendAction("updateFilter", this.get("search"));
		}
	}
});
