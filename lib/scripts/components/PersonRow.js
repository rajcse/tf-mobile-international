import config from '../config.js';
import React, { Component } from 'react';

const PersonRow = (props) => {
	let address = props.locations ? props.locations[0].address.display : '';

	return (
		<li>
			{props.names[0].first} {props.names[0].last} - {address}
		</li>
	);
}

export default PersonRow;

var styles = {

};
