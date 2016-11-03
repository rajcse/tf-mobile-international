import React from 'react';
import LocalColumn from './local';
import viewActions from '../../actions/viewActions';
import _ from 'lodash';
import uuid from 'uuid';
import Sticky from 'react-stickynode';

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
			neighborsList: location.neighbors,
			isPremium: isPremium,
			getLocationDetails: getLocationDetails(location['@search_pointer']),
			key: location['@search_pointer']
		})
	));

	return(
		<section id="location" className="widget">
			<Sticky>
				<h2 className="title">Location History</h2>
			</Sticky>

			<div className="label">
				<h4>Addresses</h4>
			</div>

			{ locations.map((location) => (
				<div key={uuid.v4()}>
					<LocalColumn
						key={location.key}
						location={location}
						openLocation={openLocation}
					/>
					<hr/>
				</div>
			)) }
		</section>
	);
};

LocationSection.propTypes = {
	locations: React.PropTypes.array.isRequired,
	isPremium: React.PropTypes.bool,
	openLocation: React.PropTypes.func
};

export default LocationSection;
