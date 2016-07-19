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
	
	let offenders = locations.map((location, i) => (
		_.pick(location,
			'sex_offenders_count'
		)
	));

	locations = locations.map((location, i) => (
		_.merge(_.pick(location.address,
			'display',
			'is_deliverable',
			'usage',
			'is_receiving_mail',
			'city',
			'country',
			'county',
			'date_first_seen',
			'date_last_seen',
			'zip_code',
			'coordinates'
		), {
			getLocationDetails: getLocationDetails(location['@search_pointer']),
			key: location['@search_pointer']
		})
	));

	let localColumns = locations.map((location, key) => (
		<LocalColumn
			key={location.key}
			location={location}
			offender={offenders[key]}
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
