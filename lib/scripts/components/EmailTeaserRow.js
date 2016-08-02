import constants from '../constants/pubRecConstants';
import React from 'react';
import TeaserLink from './TeaserLink';

const EmailTeaserRow = (props) => {

	let address = props.locations.length ? `${props.locations[0].address.city}, ${props.locations[0].address.state_code} ${props.locations[0].address.zip_code}` : '',
		name = props.names.length ? `Owner: ${props.names[0].first} ${props.names[0].last}` : '';

	return (
		<li className="email">
			<TeaserLink report={props} reportType={constants.reportTypes.EMAIL}>
				<h3>{props.emails[0].address}</h3>
				<p>{name}</p>
			</TeaserLink>
		</li>
	);
}

export default EmailTeaserRow;
