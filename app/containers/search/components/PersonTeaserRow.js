import React from 'react';
import _ from 'lodash';
import uuid from 'uuid';
import constants from 'constants/pubRecConstants';
import TeaserLink from 'components/TeaserLink';

// Global Functions File
import * as libs from 'utils/libs';

const PersonTeaserRow = (props) => {
	let age = libs.calculateAge(props.dobs[0], props.dods[0]);

	function _getRelatives() {
		let relatives = _.map(props.related_persons, (relative, index) => {
			return props.related_persons.length - 1 === index ?
				<span key={uuid.v4()}>{relative.names[0].display}</span>
				: <span key={uuid.v4()}>{relative.names[0].display}, </span>;
		 });

		return relatives;
	}

	function _getLocations() {
		let locations = _.slice(props.locations, 0, 5);
		locations = _.map(locations, (location, index) => {
			return locations.length - 1 === index ?
				<span key={uuid.v4()}>{location.address.city} {location.address.state_code}</span>
				: <span key={uuid.v4()}>{location.address.city} {location.address.state_code}, </span>;
		});

		return locations;
	}

	const locations = _getLocations();
	const relatives = _getRelatives();

	return (
		<li className="person">
			<TeaserLink teaser={props} recordType={constants.recordTypes.PERSON}>
				<h3><span className="name">{props.names[0].first} {props.names[0].middle ? props.names[0].middle : null} {props.names[0].last}</span>
					{ _.isNull(age.display) ? '' : <span className="age">{age.display} yr</span> }
				</h3>
				<h4>{ props.locations.length > 1 ? 'Locations' : 'Location' }</h4>
				<p className="location">{locations}</p>

				{ props.related_persons.length ?
					<div>
						<h4>Related</h4>
						<p className="location">{relatives}</p>
					</div>
				: null }
			</TeaserLink>
		</li>
	);
};

PersonTeaserRow.propTypes = {
	locations: React.PropTypes.array,
	related_persons: React.PropTypes.array,
	dobs: React.PropTypes.array,
	dods: React.PropTypes.array,
	names: React.PropTypes.array
};

export default PersonTeaserRow;
