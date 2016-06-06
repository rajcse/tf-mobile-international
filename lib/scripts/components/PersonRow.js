import config from '../config.js';
import constants from '../constants/pubRecConstants';
import React, { Component } from 'react';
import TeaserLink from './TeaserLink';

const PersonRow = (props) => {
	let address = props.locations ? props.locations[0].address.display : '';

	return (
		<li style={styles.li} >
			<div style={styles.names}>{props.names[0].first} {props.names[0].last}</div>
			<div style={styles.address}>{address}</div>
			<div style={styles.buttonLink}><TeaserLink person={props} reportType={constants.reportTypes.PERSON} buttonText="Open Report" /></div>
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
	    listStyleType: 'none' ,
	    marginTop: '10px',
	    marginLeft: '-40px',
	    backgroundRepeat: 'no-repeat',
    	backgroundPosition: '0px 50%',
    	paddingLeft: '0px'

	},
	names:{
		fontSize:'24px',
	    marginLeft: '10px'
	},

	address:{
		fontSize:'14px',
	    marginLeft: '10px'
	},
	buttonLink:{
		float:'right'
	}
};
