import React from 'react';
import Location from './Location';
import viewActions from 'actions/viewActions';
import _ from 'lodash';
import uuid from 'uuid';

import PreviousLocationsUpsell from './PreviousLocationsUpsell';

// Return a closure to pass to each location row
function getLocationDetails(pointer) {
	return () => (viewActions.fetchLocationTeaser(pointer));
}

const Locations = (props) => {
	let {
		locations,
		isPremium,
		openLocation,
		showPremiumUpsell
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
			<h2 className="title">Location History</h2>

			<div className="label">
				<h4>Addresses</h4>
			</div>

			{ showPremiumUpsell ?

				<div key={uuid.v4()}>
					<Location
						key={locations[0].key}
						location={locations[0]}
						openLocation={openLocation}
					/>
					<hr/>

					{ (locations.length > 1) &&
						<PreviousLocationsUpsell
							previousLocationsCount={locations.length - 1 }
							showPremiumUpsell={showPremiumUpsell}
						/>
					}

				</div>

			:
				locations.map((location) => (
					<div key={uuid.v4()}>
						<Location
							key={location.key}
							location={location}
							openLocation={openLocation}
						/>
						<hr/>
					</div>
				))
			}
		</section>
	);
};

Locations.propTypes = {
	locations: React.PropTypes.array.isRequired,
	isPremium: React.PropTypes.bool,
	openLocation: React.PropTypes.func,
	showPremiumUpsell: React.PropTypes.func
};

export default Locations;
