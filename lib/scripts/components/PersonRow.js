import config from '../config.js';
import React, { Component } from 'react';
import TeaserLink from './TeaserLink';

const PersonRow = (props) => {
	let address = props.locations ? props.locations[0].address.display : '';

	return (
		<li>
			{props.names[0].first} {props.names[0].last} - {address}
			<TeaserLink person={props} reportType={config.constants.reportTypes.PERSON} buttonText="Open Report" />
		</li>
	);
}

export default PersonRow;

var styles = {

};
