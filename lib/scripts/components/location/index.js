import React from 'react';
import LocalColumn from './local';
import viewActions from '../../actions/viewActions';
import _ from 'lodash';

// Return a closure to pass to each location row
function getLocationDetails(pointer) {
	return function() {
		viewActions.fetchLocationTeaser(pointer);
	};
}

const LocationSection = (props) => {
	let {
		locations,
		isPremium,
		openLocation
	} = props;

	locations = locations.map((location) => (
		_.merge(location, {
			getLocationDetails: getLocationDetails(location['@search_pointer']),
			key: location['@search_pointer']
		})
	));

	return(
		<section id="location" className="widget">
			<h2 className="title">Location Information</h2>
			<div className="label">
				<h4>Addresses</h4>
			</div>

			{ locations.map((location, key) => (
				<LocalColumn
					key={key}
					location={location}
					crime={location.crime}
					offender={location.sex_offenders_count}
					neigbours={(isPremium === true) ? location.neighbors : null}
					openLocation={openLocation}
				/>
			)) }
		</section>
	);
};

LocationSection.propTypes = {
	locations: React.PropTypes.array.isRequired,
	isPremium: React.PropTypes.bool.isRequired,
	openLocation: React.PropTypes.func.isRequired
};

export default LocationSection;
