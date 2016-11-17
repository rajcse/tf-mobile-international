import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Svg from 'components/svg/Svg';
import constants from 'constants/pubRecConstants';
import Link from 'components/Link';

// Global Functions File
import * as libs from 'utils/libs';

const DashboardRow = (props) => {
	let rowLabel = null,
		age, death;

	// If deathdate is valid then send with calc otherwise use birthdate
	// Date of death may contain 2 objects date & date_range.
	// Iterate through bout objects and store the valid date of death to be used later
	_.forEach(props.data.dods, (value) => {
		if(value) {
			death = props.data.dods;
		}
	});

	// Calculate age based on information available
	if (_.isUndefined(death)) {
		age = libs.calculateAge(props.data.dobs);
	} else {
		age = libs.calculateAge(props.data.dobs, death);
	}

	switch(props.id[1]) {
		case constants.recordTypes.PERSON:
			if (_.has(props.data,'name.first')){
				rowLabel = (
					<div>
						<h3><span className="name">{props.data.name.first} {props.data.name.middle} {props.data.name.last}</span>
							<span className="age">{ _.isNull(age.display) ? null : `${age.display} yr` }</span>
						</h3>


						<p className="location">
							{_.get(props.data,'location.address.city') ? props.data.location.address.city + ', ': ''} {_.has(props.data,'location.address.state') ? props.data.location.address.state : ''}
						</p>
					</div>
				);
			}
			break;

		case constants.recordTypes.PHONE:
			rowLabel = _.get(props,'data.phone.number') ? (
				<div>
					<h3>{props.data.phone.number.replace(/^(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</h3>
					<p className="location">
						{_.get(props.data,'location.address.city') ? props.data.location.address.city : ''} {_.has(props.data,'location.address.state') ? props.data.location.address.state : '' }
					</p>
					<p className="name">{_.has(props.data.name, 'first') ? props.data.name.first : ''} {_.has(props.data.name, 'last') ? props.data.name.last : ''}</p>
				</div>
			) : null;
			break;

		case constants.recordTypes.EMAIL:
			rowLabel = (
				<div>
					<h3>{_.has(props.data.email, 'address') ? props.data.email.address : ''}</h3>
					<p className="location">
						{_.get(props.data,'location.address.city') ? props.data.location.address.city + ', ' : ''} {_.has(props.data,'location.address.state') ? props.data.location.address.state : ''}
					</p>
					<p className="name">{_.has(props.data.name, 'first') ? props.data.name.first : ''} {_.has(props.data.name, 'last') ? props.data.name.last : ''}</p>
				</div>
			);
			break;

		case constants.recordTypes.LOCATION:
		default:
			break;
	}

	return (
		<li className={classNames('history-item', props.id[1], { premium: props.data.isPremium })}>
			<Link to={'/users/' + props.id[0] + '/records/' + props.id[2]}>
				{props.data.isPremium ? <span className="premium-text"><Svg svg="premiumIcon" style={{width: 12}} className="premium-icon" /> Premium Report</span> : null}
				{rowLabel}
			</Link>
		</li>
	);
};

DashboardRow.propTypes = {
	id: React.PropTypes.array.isRequired,
	data: React.PropTypes.object.isRequired
};

export default DashboardRow;
