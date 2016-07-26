import React from 'react';
import uuid from 'uuid';
import LocalColumn from './local';
import viewActions from '../../actions/viewActions';

// Return a closure to pass to each location row
function getLocationDetails(pointer) {
	return function() {
		viewActions.fetchLocationTeaser(pointer);
	}
}

const LocationSectionView = (props) => {
	let { locations } = props;

	locations = locations.map((location, i) => (
		_.merge(location, {
			getLocationDetails: getLocationDetails(location['@search_pointer']),
			key: location['@search_pointer']
		})
	));

	let localColumns = locations.map((location, key) => (
		<LocalColumn
			key={location.key}
			location={location}
			offender={location.sex_offenders_count}
		/>
	));

	return(
		<section id='location' className='widget'>
			<h2 className='title'>Location Information</h2>

			{localColumns}
		</section>
	);
}

LocationSectionView.propTypes = {
	locations: React.PropTypes.array.isRequired
}

export default LocationSectionView;
