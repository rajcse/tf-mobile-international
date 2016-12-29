import React from 'react';
import constants from 'constants/pubRecConstants';
import TeaserLink from 'components/TeaserLink';

const PhoneTeaserRow = (props) => {
	return (
		<li className="phone">
			<TeaserLink teaser={props} recordType={constants.recordTypes.PHONE}>
				<h3>{props.phones[0].display}</h3>
				<p>Owner: Tap this report to view</p>
			</TeaserLink>
		</li>
	);
};

PhoneTeaserRow.propTypes = {
	phones: React.PropTypes.array.isRequired
};

export default PhoneTeaserRow;
