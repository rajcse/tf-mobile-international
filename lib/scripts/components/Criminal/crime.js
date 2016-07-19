import React, { Component, PropTypes } from 'react';
import LabelValue from '../Shared/LabelValue';
import constants from '../../constants/pubRecConstants';

import _ from 'lodash';
import uuid from 'uuid';
import moment from 'moment';
import classNames from 'classnames';
import config from 'config';

import CriminalDetails from './details';

class CriminalRow extends Component {
	constructor(props) {
    super(props);

		this.state = {
			openDetails: false
		};

    this.toggleCriminalDetails = this.toggleCriminalDetails.bind(this);
  }

	toggleCriminalDetails() {
		if (this.state.openDetails) {
			this.setState({
				openDetails: false
			});
		} else {
			this.setState({
				openDetails: true
			});
		}
  }

	render() {
		let { crime } = this.props;

		// Matching Criminal Records By...
		let matching = _.pick(crime.matching_fields,
			'city',
			'dob',
			'first',
			'last',
			'middle',
			'state',
			'zip_code'
		);

		let matchingNode = [];

		for (var index in matching) {
			if (matching[index]) {
				matchingNode.push(<li key={uuid.v1()} className='match'>{_.startCase(index)}</li>);
			} else {
				matchingNode.push(<li key={uuid.v1()}>{_.startCase(index)}</li>);
			}
		}

		// Criminal Details
		let details = _.pick(crime,
			'case_number',
			'case_filing_date',
			'address',
			'dob',
			'offenses',
			'prison_sentences',
			'parole_sentences',
			'mugshots',
			'eyes',
			'hair',
			'height',
			'weight',
			'race',
			'sex',
			'data_source',
			'data_source_state'
		);

		// Booking Date
		let bookingDate;

		if (_.has(crime.case_filing_date, 'month')) {
			let date = crime.case_filing_date;
			bookingDate = <div>
				<small>Booking Date:</small>
				<p>{moment({month: crime.case_filing_date.month - 1 /* Months are 0 indexed */ , day: crime.case_filing_date.day, year: crime.case_filing_date.year}).format('LL')}</p>
			</div>;
		}

		// Location / County Info
		let locationInfo;

		if (!_.isEmpty(crime.county_of_origin)) {
			locationInfo = <div>
				<small>Location / County:</small>
				<p>{_.startCase(crime.county_of_origin)}</p>
			</div>
		}

		// Mugshots
		let mugshot = '//placehold.it/300x300';

		if (!_.isNull(crime.mugshots)) {
			mugshot = `${config.API_ROOT}/data/image/${crime.mugshots[0].token}`;
		}

		// Button Text
		let buttonText;
		
		if (this.state.openDetails) {
			buttonText = 'Hide Criminal Details'
		} else {
			buttonText = 'Show Criminal Details'
		}

		return (
			<div className='criminal row'>
				<h4>{crime.name.display}</h4>

				<div className='row-content'>
					<div className='criminal-photo'>
						<img src={ mugshot } />
					</div>

					<div className='criminal-details'>
						{/* Booking Information */}
						{bookingDate}
						{/*Location Information*/}
						{locationInfo}

						<button onTouchTap={() => this.toggleCriminalDetails()} className='btn-link pull-right'>{buttonText}</button>
					</div>

					{this.state.openDetails ?
						<CriminalDetails
							key={`details-${uuid.v1()}`}
							details={details}
						/>
					: null }
				</div>

				<div className='row-footer'>
					<h5>Match Rating based on:</h5>
					<ul className='matching-records'>
						{matchingNode}
					</ul>
				</div>
			</div>
		);
	}
}

CriminalRow.propTypes = {
    crime: PropTypes.object.isRequired
}

export default CriminalRow;
