import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import moment from 'moment';
import classNames from 'classnames';
import _ from 'lodash';

class CriminalRecordsList extends Component {
	render() {
		let { crimes, openCrime } = this.props;

		return (
			<div className="criminal-results simple-column row">
				<div className="label">
					<h4>Best Match</h4>
				</div>

				<OwlCarousel slideSpeed={300} itemsCustom={[[0,1.25], [375, 1.5]]} navigation={false} autoHeight singleItem={false} autoPlay={false} >
					{ crimes.map((crime, index) => {
						// Match
						let matchClass = '';

						if (crime.matching_fields.dob) {
							matchClass = 'most-likely-match';
						} else if (crime.matching_fields.state) {
							matchClass = 'likely-match';
						} else {
							matchClass = 'least-likely-match';
						}

						return (
							<div key={index} className={classNames('criminal-card', matchClass)}>
								<h2 className="h4">{`${crime.name.first} ${crime.name.last}`}</h2>

								{ _.has(crime, 'address.city') && !_.isEmpty(crime.address.city) ?
									!_.isNull(crime.address.state_code) ?
										<p>{`${crime.address.city}, ${crime.address.state_code}`}</p>
									: null
								: null }

								{ _.has(crime, 'offenses[0].case_type') && !_.isEmpty(crime.offenses[0].case_type) ?
									<p>{`${_.capitalize(crime.offenses[0].case_type)}`}</p>
								: null }

								{ _.has(crime, 'offenses[0].arrest.date') && !_.isNull(crime.offenses[0].arrest.date)?
									<p>{moment(`${crime.offenses[0].arrest.date.month}/${crime.offenses[0].arrest.date.day}/${crime.offenses[0].arrest.date.year}`, 'MM/DD/YYYY').format('ll')}</p>
									: _.has(crime, 'case_filing_date') && !_.isNull(crime.case_filing_date) ?
										<p>{moment(`${crime.case_filing_date.month}/${crime.case_filing_date.day}/${crime.case_filing_date.year}`, 'MM/DD/YYYY').format('ll')}</p>
								: null }

								<button onClick={ () => { openCrime(crime); } } className="btn btn-link">Case Details</button>
							</div>
						);
					}) }
				</OwlCarousel>
			</div>
		);
	}
}

CriminalRecordsList.propTypes = {
	openCrime: React.PropTypes.func.isRequired,
	crimes: React.PropTypes.array.isRequired
};

export default CriminalRecordsList;
