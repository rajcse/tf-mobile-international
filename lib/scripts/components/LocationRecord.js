import React, { Component } from 'react';
import _ from 'lodash';

import LocationSectionView from './Location';

const LocationRecord = (props) => {

	return (
		<main>
			<h1>Location Report</h1>
			<LocationSectionView
				locations={props.record.reportData.locations}
			/>
		</main>
	);
}

export default LocationRecord;
