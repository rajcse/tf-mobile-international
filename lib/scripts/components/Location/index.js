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

	locations = locations.map((location) => (
		_.merge(location, {
			getLocationDetails: getLocationDetails(location['@search_pointer']),
			key: location['@search_pointer']
		})
	));

	return(
		<section id='location' className='widget'>
			<h2 className='title'>Location Information</h2>

			{ locations.map((location) => (
				<LocalColumn
					key={location.key}
					location={location}
					offender={location.sex_offenders_count}
				/>
			)) }
		</section>
	);
}

LocationSectionView.propTypes = {
	locations: React.PropTypes.array.isRequired
}

export default LocationSectionView;
