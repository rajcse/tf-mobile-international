import React, { Component } from 'react';
import _ from 'lodash';

import LocationSectionView from './Location';

const LocationReport = (props) => {

	return (
		<main>
			<h1>Location Report</h1>
			<LocationSectionView
				locations={props.person.locations}
			/>
		</main>
	);
}

export default LocationReport;
