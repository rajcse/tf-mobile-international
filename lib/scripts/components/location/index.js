import React from 'react';
import LocalColumn from './local';
import viewActions from '../../actions/viewActions';
import _ from 'lodash';
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
				<h2 className="title">Location Information</h2>
			</Sticky>
			
			<div className="label">
				<h4>Addresses</h4>
			</div>

			{ locations.map((location, key) => (
				<LocalColumn
					key={key}
					location={location}
					openLocation={openLocation}
				/>
			)) }
		</section>
	);
};

LocationSection.propTypes = {
	locations: React.PropTypes.array.isRequired,
	isPremium: React.PropTypes.bool.isRequired,
	openLocation: React.PropTypes.func
};

export default LocationSection;
