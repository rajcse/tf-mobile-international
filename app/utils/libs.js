import _ from 'lodash';
import moment from 'moment';

// ucwords for JS!
export function titleCase(str) {
	return _.startCase(_.capitalize(str));
}

/**
 * Calculate the age from data service date objects
 * @param  {object} birthday - Month, Day, and Year of the birthday
 * @param  {object} [deathday] - Month, Day, and Year of the deathday
 * @return {object} age - Object containing range, birthday, deathday, and display properties
 */
export function calculateAge(birthday, deathday) {
	let age = {
		range: false,
		birthday: _getFormattedDate(birthday),
		deathday: _getFormattedDate(deathday),
		display: null
	};

	// Logging to see if this happens
	if(birthday && _.isEmpty(birthday)) console.log('Birthdate is present, but empty object');

	// Check if birthdate exists if not return default age object
	if (!birthday || _.isEmpty(birthday)) return age;

	// Calculate age based on birthdate and/or deathdate information
	// Always return formatted birthdate information
	// Use the deathdate, or birthdate as the main source of truth
	const reference = deathday || birthday;

	// Find the user date/date_range in birthdate/deathdate as reference
	let refDate = reference.date;

	if (!refDate) {
		// Catch weird cases where date range may be too ambitious
		refDate = reference.date_range
					? (reference.date_range.start.year > 1900 ? reference.date_range.start : reference.date_range.end)
					: null;

		// Display approximate age to user
		age.range = true;
	}

	// Format reference date
	if (refDate) {
		const refMoment = moment({month: refDate.month - 1, day: refDate.day, year: refDate.year});

		// Return calculated age based on birthdate or date of death
		age.display = !deathday ? moment().diff(refMoment, 'years') : refMoment.diff(getMomentFromQuantumDate(birthday), 'years');
	}

	return age;
}

/**
 * Returns a moment created from Data Service's quantum date objects, where if there isn't an exact date, there might be a date range
 * @param  {object} dsQuantumDate - Plain object in the shape of Data Service's quantum dates
 * @return {moment} Moment.js moment
 */
export function getMomentFromQuantumDate(dsQuantumDate) {
	// Data Service date may be coming from date/date_range.start
	const dsDate = _.get(dsQuantumDate, 'date') || _.get(dsQuantumDate, 'date_range.start', null);

	// Check if date/date_range information exist / If not return null date
	if (!dsDate) return null;

	// Moment is 0 month indexed
	return moment({month: dsDate.month - 1, day: dsDate.day, year: dsDate.year});
}

export function _getFormattedDate(reference) {
	const refDateMoment = getMomentFromQuantumDate(reference);

	// If null, return null for formatted
	if (!refDateMoment) return null;

	return refDateMoment.format('LL');
}

export function _getFormattedCurrency(data) {
	return `$ ${data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
}
