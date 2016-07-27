import constants from '../constants/pubRecConstants';
import React from 'react';
import TeaserLink from './TeaserLink';

const PhoneTeaserRow = (props) => {

	let address = props.locations.length ? `${props.locations[0].address.city}, ${props.locations[0].address.state_code} ${props.locations[0].address.zip_code}` : '',
		name = props.names.length ? `Owner: ${props.names[0].first} ${props.names[0].last}` : '';

	return (
		<li className="phone">
			<TeaserLink report={props} reportType={constants.reportTypes.PHONE}>
				<h3>{props.phones[0].display}</h3>
				<p>{name}</p>
				<p>{address}</p>
			</TeaserLink>
		</li>
	);
}

export default PhoneTeaserRow;
