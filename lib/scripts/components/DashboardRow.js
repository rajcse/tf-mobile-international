import config from '../config.js';
import React, { PropTypes, Component } from 'react';
import {Link} from 'react-router';
import _ from 'lodash';

const DashboardRow = (props) => {

	return (

		<li>
			{<Link to={"/people/" + props.id[2]} >{_.has(props.data.name,'first') ? props.data.name.first : ''} {_.has(props.data.name,'last') ? props.data.name.last : ''}</Link>}
		</li>
	);
}

export default DashboardRow;

var styles = {

};
