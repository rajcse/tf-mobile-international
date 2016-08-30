import React from 'react';

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
};

LocationRecord.propTypes = {
	record: React.PropTypes.object
};

export default LocationRecord;
