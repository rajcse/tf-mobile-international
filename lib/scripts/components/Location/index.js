import React, { Component, PropTypes } from 'react';

import LocalColumn from './local';

import uuid from 'uuid';

const LocationSectionView = (props) => {
	let { locations } = props;
	let map;

	locations = locations.map((location, i) => (
		_.pick(location.address,
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
		)
	));

	let localColumns = locations.map((location, key) => (
		<LocalColumn
			key={key}
			location={location}
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
	locations: PropTypes.array.isRequired
}

export default LocationSectionView;
