import constants from 'constants/pubRecConstants';
import React from 'react';
import TeaserLink from 'components/TeaserLink';

const EmailTeaserRow = (props) => {

	let name = props.names.length ? `Owner: ${props.names[0].first} ${props.names[0].last}` : '';

	return (
		<li className="email">
			<TeaserLink teaser={props} recordType={constants.recordTypes.EMAIL}>
				<h3>{props.emails[0].address}</h3>
				<p>{name}</p>
			</TeaserLink>
		</li>
	);
};

EmailTeaserRow.propTypes = {
	names: React.PropTypes.array,
	emails: React.PropTypes.array.isRequired
};

export default EmailTeaserRow;
