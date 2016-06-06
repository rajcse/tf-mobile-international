import config from '../config.js';
import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

const DashboardRow = (props) => {

	return (

		<li style={styles.li} >
			<div style={styles.names}>{_.has(props.data.name,'first') ? props.data.name.first : ''} {_.has(props.data.name,'last') ? props.data.name.last : ''}</div>
			<div style={styles.address}>{_.has(props.data,'location.address.city') ? props.data.location.address.city : ''}, {_.has(props.data,'location.address.state') ? props.data.location.address.state : ''}</div>
			
			<div style={styles.buttonLink} class="buttonLink">{<Link to={"/people/" + props.id[2]} > <button>Open Report</button></Link>}</div>
		</li>
	);
}

export default DashboardRow;


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