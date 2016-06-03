import config from '../config.js';
import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';

const DashboardRow = (props) => {
	//console.log(props);
	//let address = props.locations ? props.locations[0].address.display : '';
	//console.log(props.id[2]);
	return (

		<li>
			{<Link to={"/people/" + props.id[2]} >{props.data.name.first} {props.data.name.last}</Link>}
		</li>
	);
}

export default DashboardRow;

var styles = {

};
