import React, { Component } from 'react';
import _ from 'lodash';
import Link from '../Link';

const DashboardRow = (props) => {

	let rowLabel = null;

	switch(props.id[1]) {
	        case 'person':
	            rowLabel = <div className={props.data.isPremium ? 'dashboard-person-item-premium' : 'dashboard-person-item'} >
								<h3>{_.has(props.data.name, 'first') ? props.data.name.first : ''} {_.has(props.data.name, 'last') ? props.data.name.last : ''}</h3>
						<p className="location">{_.has(props.data,'location.address.city') && props.data.location.address.city !== null ? props.data.location.address.city + ', ': ''} {_.has(props.data,'location.address.state') ? props.data.location.address.state : ''}</p>
						<p className="age">{_.has(props.data,'dobs.date.year') ? (new Date().getFullYear() - props.data.dobs.date.year) + ' Years Old' : ''}</p>
		            </div>
	            break;
	        case 'phone':
	            rowLabel = <div className="dashboard-phone-item">
	            		<h3>{_.has(props.data.phone, 'number') ? props.data.phone.number : ''}</h3>
						<p className="location">{_.has(props.data,'location.address.city') && props.data.location.address.city !== null ? props.data.location.address.city : ''} {_.has(props.data,'location.address.state') ? props.data.location.address.state : '' }</p>
						<p className="name">{_.has(props.data.name, 'first') ? props.data.name.first : ''} {_.has(props.data.name, 'last') ? props.data.name.last : ''}</p>
	            	</div>
	            break;
	        case 'email':
	            rowLabel = <div className="dashboard-email-item">
	            		<h3>{_.has(props.data.email, 'address') ? props.data.email.address : ''}</h3>
						<p className="location">{_.has(props.data,'location.address.city') && props.data.location.address.city !== null ? props.data.location.address.city + ', ' : ''} {_.has(props.data,'location.address.state') ? props.data.location.address.state : ''}</p>
						<p className="name">{_.has(props.data.name, 'first') ? props.data.name.first : ''} {_.has(props.data.name, 'last') ? props.data.name.last : ''}</p>
		            </div>
	            break;
	        case 'location':
	            rowLabel = <div className="dashboard-location-item">
	            		<h3>{_.has(props.data,'address.street') ? props.data.address.street : ''}</h3>
						<p className="location">{_.has(props.data,'address.city') && props.data.address.city !== null ? props.data.address.city + ', ' : ''} {_.has(props.data,'address.state') ? props.data.address.state : ''}</p>
					</div>
	            break;
	        default:
	            break;
	    }

	return (
		<li className="history-item">
			<Link to={'/users/' + props.id[0] + '/records/' + props.id[2]}>
				{rowLabel}
			</Link>
		</li>
	);
}

export default DashboardRow;
