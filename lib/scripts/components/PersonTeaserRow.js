import constants from '../constants/pubRecConstants';
import React, { Component } from 'react';
import TeaserLink from './TeaserLink';

const PersonTeaserRow = (props) => {
	let address = props.locations ? props.locations[0].address.display : '';

	return (
		<li className="person">
			<TeaserLink report={props} reportType={constants.reportTypes.PERSON}>
				<h3>{props.names[0].first} {props.names[0].last}</h3>
				<p>{address}</p>
			</TeaserLink>
		</li>
	);
}

export default PersonTeaserRow;