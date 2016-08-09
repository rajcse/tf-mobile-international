import React from 'react';
import uuid from 'uuid';
import LocalColumn from './local';
import viewActions from '../../actions/viewActions';
import _ from 'lodash';

// Return a closure to pass to each location row
function getLocationDetails(pointer) {
	return function() {
		viewActions.fetchLocationTeaser(pointer);
	}
}

const LocationSection = (props) => {
	let { locations, isPremium } = props;

	locations = locations.map((location) => (
		_.merge(location, {
			getLocationDetails: getLocationDetails(location['@search_pointer']),
			key: location['@search_pointer']
		})
	));

	return(
		<section id='location' className='widget'>
			<h2 className='title'>Location Information</h2>

			{ locations.map((location, key) => (
				<LocalColumn
					key={location.key}
					location={location}
					crime={location.crime}
					offender={location.sex_offenders_count}
					neigbours={(isPremium === true) ? location.neighbors : null}
				/>
			)) }
		</section>
	);
}

LocationSection.propTypes = {
	locations: React.PropTypes.array.isRequired
}

export default LocationSection;
