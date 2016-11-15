import React from 'react';

import Locations from './components/Locations';

const LocationRecord = (props) => {

	return (
		<main>
			<h1>Location Report</h1>
			<Locations
				locations={props.record.reportData.locations}
			/>
		</main>
	);
};

LocationRecord.propTypes = {
	record: React.PropTypes.object
};

export default LocationRecord;
