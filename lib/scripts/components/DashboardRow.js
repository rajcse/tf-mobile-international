import React, { Component } from 'react';
import _ from 'lodash';
import Link from './Link';

const DashboardRow = (props) => {

	return (
		<li className="history-item">
			<Link to={'/users/' + props.id[0] + '/records/' + props.id[2]}>
				<h3>{_.has(props.data.name, 'first') ? props.data.name.first : ''} {_.has(props.data.name, 'last') ? props.data.name.last : ''}</h3>
				
				<p className="location">{_.has(props.data,'location.address.city') ? props.data.location.address.city : ''}, {_.has(props.data,'location.address.state') ? props.data.location.address.state : ''}</p>
			</Link>
		</li>
	);
}

export default DashboardRow;