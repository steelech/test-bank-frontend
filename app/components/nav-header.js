import Ember from 'ember';

export default Ember.Component.extend({
	classNames: 'nav-header',
	session: Ember.inject.service('session')
});
