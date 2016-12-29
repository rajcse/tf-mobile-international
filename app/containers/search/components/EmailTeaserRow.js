import constants from 'constants/pubRecConstants';
import React from 'react';
import TeaserLink from 'components/TeaserLink';

const EmailTeaserRow = (props) => {
	return (
		<li className="email">
			<TeaserLink teaser={props} recordType={constants.recordTypes.EMAIL}>
				<h3>{props.emails[0].address}</h3>
				<p>Owner: Tap this report to view</p>
			</TeaserLink>
		</li>
	);
};

EmailTeaserRow.propTypes = {
	emails: React.PropTypes.array.isRequired
};

export default EmailTeaserRow;
