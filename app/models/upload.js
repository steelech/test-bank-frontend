import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	course: DS.attr('string'),
	s3_key: DS.attr('string'),
        s3_bucket: DS.attr('string'),
	url: DS.attr('string'),
	user: DS.attr('string'), 
	file_type: DS.attr('string')	
});
