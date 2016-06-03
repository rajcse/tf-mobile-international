import config from '../config.js';
import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';

const DashboardRow = (props) => {

	return (

		<li>
			{<Link to={"/people/" + props.id[2]} >{props.data.name.first} {props.data.name.last}</Link>}
		</li>
	);
}

export default DashboardRow;

var styles = {

};
