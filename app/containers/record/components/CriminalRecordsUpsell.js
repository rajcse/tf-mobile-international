import React, { PropTypes } from 'react';
import Svg from 'components/svg/Svg';

const CriminalRecordsUpsell = props => {
	let { criminalRecordsCount, showStandardUpsell } = props;

	return (
		<div className="criminal-upsell simple-column">
			<Svg className="warning" svg="exclamationWhite" />
			<h3>{criminalRecordsCount} possible criminal records available</h3>
			<button onClick={showStandardUpsell} className="btn btn-upgrade">View Criminal Records</button>
		</div>
	);
};

CriminalRecordsUpsell.propTypes = {
	criminalRecordsCount: PropTypes.number.isRequired,
	showStandardUpsell: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.bool
	]).isRequired
};

export default CriminalRecordsUpsell;
