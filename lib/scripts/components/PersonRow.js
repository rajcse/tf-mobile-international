import config from '../config.js';
import React, { Component } from 'react';
import TeaserLink from './TeaserLink';

const PersonRow = (props) => {
	let address = props.locations ? props.locations[0].address.display : '';

	return (
		<li style={styles.li} >
			<div style={styles.names}>{props.names[0].first} {props.names[0].last}</div>
			<div style={styles.address}>{address}</div>
			<div style={styles.buttonLink}><TeaserLink person={props} reportType={config.constants.reportTypes.PERSON} buttonText="Open Report" /></div>
		</li>
	);
}

export default PersonRow;


var styles = {
	li: {

		padding: '25px 25px 50px',
	    position: 'relative',
    	color: '#3e3e3e',
    	background: '#f3f3f3',
	    'list-style-type': 'none' ,
	    'margin-top': '10px',
	    'margin-left': '-40px',
	    'background-repeat': 'no-repeat',
    	'background-position': '0px 50%',
    	'padding-left': '0px'

	},
	names:{
		'font-size':'24px',
	    'margin-left': '10px'
	},

	address:{
		'font-size':'14px',
	    'margin-left': '10px'
	},
	buttonLink:{
		float:'right'
	}
};
