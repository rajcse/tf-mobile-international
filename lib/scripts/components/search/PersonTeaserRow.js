import constants from '../../constants/pubRecConstants';
import React, { Component } from 'react';
import TeaserLink from '../TeaserLink';

const PersonTeaserRow = (props) => {

	let address = props.locations.length ? `${props.locations[0].address.city}, ${props.locations[0].address.state_code}` : '',
		age = props.dobs.length ? props.dobs[0].age : '';

	return (
		<li className="person">
			<TeaserLink teaser={props} recordType={constants.recordTypes.PERSON}>
				<h3>{props.names[0].first} {props.names[0].last} <span className="age">{age}</span></h3>
				<p>{address}</p>
			</TeaserLink>
		</li>
	);
}

export default PersonTeaserRow;
