import React, { PropTypes } from 'react';
import Svg from 'components/svg/Svg';

const PreviousLocationsUpsell = props => {
	let { previousLocationsCount, showPremiumUpsell } = props;

	return (
		<div className="location-upsell simple-column">
			<Svg className="warning" svg="exclamationWhite" />
			<h3>{previousLocationsCount} possible previous location{previousLocationsCount > 1 ? 's' : ''} available</h3>
			<button onClick={showPremiumUpsell} className="btn btn-upgrade">View Previous Locations</button>
		</div>
	);
};

PreviousLocationsUpsell.propTypes = {
	previousLocationsCount: PropTypes.number.isRequired,
	showPremiumUpsell: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.bool
	]).isRequired
};

export default PreviousLocationsUpsell;
