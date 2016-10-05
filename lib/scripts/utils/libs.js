import _ from 'lodash';
import moment from 'moment';

// Calculate the age of anyone given data
export function calculateAge(birthday, deathday) {
	let age = {
		range: false,
		birthday: null,
		deathday: null,
		display: null,
	};

	// Check if birthdate exist if not return null
	if (_.isNull(birthday) || _.isEmpty(birthday)) {
		return age;
	} else {
		// Calculate age based on birthdate and/or deathdate information
		// Always return formatted birthdate information
		// Use the birthdate as the main source of truth
		let reference = birthday;
		age.birthday = _getFormattedDate(reference);

		// Check if deathdate exist. If yes, return formatted deathdate and age at death
		if (!_.isUndefined(deathday)) {
			// Alternative / Use the deathdate as the main source of truth
			reference = deathday;
			// Return formatted date of death
			age.deathday = _getFormattedDate(reference);
		}

		// Find the user date/date_range in birthdate/deathdate as reference
		if (_.isNull(reference.date)) {
			// Catch weird cases where date range may be too ambitious
			reference = _.isNull(reference.date_range) ? null :
			reference.date_range.start.year > 1900 ? reference.date_range.start : reference.date_range.end;

			// Display approximate age to user
			age.range = true;
		} else {
			reference = reference.date;
		}

		// Format reference date
		if (!_.isUndefined(reference) && !_.isNull(reference)) {
			reference = moment(`${reference.month}/${reference.day}/${reference.year}`, 'MM/DD/YYYY');

			// Return calculated age based on birthdate or date of death
			if (_.isUndefined(deathday)) {
				age.display = moment().diff(reference, 'years');
			} else {
				age.display = moment(reference).diff(age.birthday, 'years');
			}
		}

		// If age information does not exist or is default 0 attempt to use date/date_range to calculate age
		if (_.isUndefined(age.display) || age.display === 0) {
			// Check if age information already exist in birthdate/deathdate information
			// This is the prefered source of age.
			age.display = _.isNull(reference.age) || reference.age === 0  ? reference.age_range.low : reference.age;
		}
	}

	// Returns an age object to avoid seperation of concern with other components
	// age: {
	// 		range: boolean,
	// 		birthday: string/null,
	// 		deathday: string/null,
	// 		display: integer
	// }

	return age;
}

function _getFormattedDate(reference) {
	// Format birthdate/deathdate which may be coming from date/date_range.start
	reference = _.isNull(reference.date) ?
		_.isNull(reference.date_range) ? null : reference.date_range.start
			: reference.date;

	// Check if date/date_range information exist / If not return null date
	if (_.isNull(reference) || _.isUndefined(reference)) {
		return null;
	}

	reference = moment(`${reference.month}/${reference.day}/${reference.year}`, 'MM/DD/YYYY');

	return reference.format('LL');
}
