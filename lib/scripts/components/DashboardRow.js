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
	    listStyleType: 'none' ,
	    marginTop: '10px',
	    marginLeft: '-40px',
	    backgroundRepeat: 'no-repeat',
    	backgroundPosition: '0px 50%',
    	paddingLeft: '0px'

	},

	names:{
		fontSize: '24px',
	    marginLeft: '10px'
	},

	address:{
		fontSize: '14px',
	    marginLeft: '10px'
	},
	buttonLink:{
		float: 'right'
	}
};