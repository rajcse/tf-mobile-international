import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames';
import constants from '../../constants/pubRecConstants';
import Link from '../Link';

const DashboardRow = (props) => {

	function calculateAge(birthday, death) {
		// Check if dob exist
		if (_.isNull(birthday) || _.isEmpty(birthday)) {
			return null;
		}

		// Format Date
		birthday = moment(`${birthday.month}/${birthday.day}/${birthday.year}`, 'MM/DD/YYYY');

		if (_.isUndefined(death)) {
			return moment().diff(birthday, 'years');
		} else {
			death = moment(`${death.month}/${death.day}/${death.year}`, 'MM/DD/YYYY');

			return birthday.diff(death, 'years');
		}
	}

	let rowLabel = null;

	switch(props.id[1]) {
	case constants.recordTypes.PERSON:
		let dob = _.has(props.data,'dobs.date') && props.data.dobs.date ? props.data.dobs.date
			: _.has(props.data,'dobs.date_range.start') && props.data.dobs.date_range.start ? props.data.dobs.date_range.start
				: null;

		let dod = _.has(props.data,'dods.date') && props.data.dods.date ? props.data.dods.date
			: _.has(props.data,'dods.date_range.start') && props.data.dods.date_range.start ? props.data.dods.date_range.start
				: null;

		let age = '';

		if (dod && dob) {
			age = calculateAge(dob, dod);
		} else {
			age = calculateAge(dob);
		}

		if (_.has(props.data,'name.first')){
			rowLabel = (
				<div>
					<h3><span className="name">{props.data.name.first} {props.data.name.last}</span>
						{ _.isNull(age) ? null : <span className="age">{age} yr</span> }
					</h3>


					<p className="location">{_.has(props.data,'location.address.city') && props.data.location.address.city !== null ? props.data.location.address.city + ', ': ''} {_.has(props.data,'location.address.state') ? props.data.location.address.state : ''}</p>
				</div>
			);
		}
		break;
	case constants.recordTypes.PHONE:
		rowLabel = (
			<div>
				<h3>{props.data.phone.number.replace(/^(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}</h3>
				<p className="location">{_.has(props.data,'location.address.city') && props.data.location.address.city !== null ? props.data.location.address.city : ''} {_.has(props.data,'location.address.state') ? props.data.location.address.state : '' }</p>
				<p className="name">{_.has(props.data.name, 'first') ? props.data.name.first : ''} {_.has(props.data.name, 'last') ? props.data.name.last : ''}</p>
			</div>
		);
		break;
	case constants.recordTypes.EMAIL:
		rowLabel = (
			<div>
				<h3>{_.has(props.data.email, 'address') ? props.data.email.address : ''}</h3>
				<p className="location">{_.has(props.data,'location.address.city') && props.data.location.address.city !== null ? props.data.location.address.city + ', ' : ''} {_.has(props.data,'location.address.state') ? props.data.location.address.state : ''}</p>
				<p className="name">{_.has(props.data.name, 'first') ? props.data.name.first : ''} {_.has(props.data.name, 'last') ? props.data.name.last : ''}</p>
			</div>
		);
		break;
	case constants.recordTypes.LOCATION:
		rowLabel = null;
		break;
	default:
		break;
	}

	return (
		<li className={classNames('history-item', props.id[1], { premium: props.data.isPremium })}>
			<Link to={'/users/' + props.id[0] + '/records/' + props.id[2]}>
				{props.data.isPremium ? <span className="premium-text"><i className="premium-icon" /> Premium Report</span> : null}
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
