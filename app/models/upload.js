import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	course: DS.attr('string'),
	key: DS.attr('string'),
        bucket: DS.attr('string'),
	url: DS.attr('string')	

});
