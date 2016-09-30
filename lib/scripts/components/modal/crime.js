import React, { Component } from 'react';
import _ from 'lodash';
import config from 'config';
import uuid from 'uuid';
import Svg from '../Svg';
import moment from 'moment';

import Header from '../shared/Header';
import SimpleInline from '../shared/SimpleInline';
import constants from '../../constants/pubRecConstants';

class CrimeModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errored: false
		};
	}

	handleError() {
		this.setState({
			errored: true
		});
	}

	render() {
		let {
			closeCrime,
			offender
		} = this.props;

		// State
		const state = _.isNull(offender.address) ? 'All' : offender.address.state_code;
		console.log(offender);
		// Case Details
		let offenseDetails = [];

		_.map(offender.offenses, (offense, index) => {
			let case_number = offense.case_number
				? offense.case_number
				: _.has(offense, 'court.case_number') && offense.court.case_number
					? offense.court.case_number
					: offender.case_number
						? offender.case_number
						: null;

			let offenseDescriptions = offense.description
				? offense.description.split('<Br>')
				: null;

			offenseDetails.push(
				<div key={index} className="offense-detail">
					<h4>Offense Details</h4>
					{ offense.offense_date ?
						<SimpleInline
							key={`${uuid.v4()}`}
							title={['Case Number', 'Date']}
							contents={[case_number, constants.months[offense.offense_date.month] + ', ' + offense.offense_date.day + ' ' + offense.offense_date.year ]}
							classes="inline-half"
						/>
					: null }


					{ offenseDescriptions ?
						<div>
							<div className="label">
								<h4>Description</h4>
							</div>

							<div className="content">
								<ul>
								{
									_.map(offenseDescriptions, (description, index) => {
										return (
										<li key={`${uuid.v4()}`}>{description}</li>
										)
									})
								}
								</ul>
							</div>
						</div>
					: null }

					{ offense.case_type ?
						<div>
							<div className="label">
								<h4>Case Type</h4>
							</div>

							<div className="content">
								<p>{offense.case_type}</p>
							</div>
						</div>
					: null }

					{ offense.charge_category ?
						<div>
							<div className="label">
								<h4>Offense Category</h4>
							</div>

							<div className="content">
								<p>{offense.charge_category}</p>
							</div>
						</div>
					: null }

					{ offense.offense_type ?
						<div>
							<div className="label">
								<h4>Offense Type Code</h4>
							</div>

							<div className="content">
								<p>{offense.offense_type}</p>
							</div>
						</div>
					: null }

					{ offense.arrest ?
						<div>
							<div className="label">
								<h4>Arrest Made</h4>
							</div>

							<div className="content">
								<p>Yes</p>
							</div>
						</div>
					: null }

					{ _.has(offense, 'arrest.date') && offense.arrest.date ?
						<div>
							<div className="label">
								<h4>Arrest Date</h4>
							</div>

							<div className="content">
								<p>{moment(`${offense.arrest.date.month}/${offense.arrest.date.day}/${offense.arrest.date.year}`, 'MM/DD/YYYY').format('ll')}</p>
							</div>
						</div>
					: null }

					{ _.has(offense, 'arrest.disposition') && offense.arrest.disposition ?
						<div>
							<div className="label">
								<h4>Arrest Disposition</h4>
							</div>

							<div className="content">
								<p>{offense.arrest.disposition}</p>
							</div>
						</div>
					: null }

					{ _.has(offense, 'court.description') && offense.court.description ?
						<div>
							<div className="label">
								<h4>Court Description</h4>
							</div>

							<div className="content">
								<p>{offense.court.description}</p>
							</div>
						</div>
					: null }

					{ _.has(offense, 'court.level') && offense.court.level ?
						<div>
							<div className="label">
								<h4>Court Classification</h4>
							</div>

							<div className="content">
								<p>{offense.court.level}</p>
							</div>
						</div>
					: null }

					{ _.has(offense, 'court.statute') && offense.court.statute ?
						<div>
							<div className="label">
								<h4>Court Statute</h4>
							</div>

							<div className="content">
								<p>{offense.court.statute}</p>
							</div>
						</div>
					: null }

					{ _.has(offense, 'court.plea') && offense.court.plea ?
						<div>
							<div className="label">
								<h4>Court Plea</h4>
							</div>

							<div className="content">
								<p>{offense.court.plea}</p>
							</div>
						</div>
					: null }

					{ _.has(offense, 'court.disposition_date') && offense.court.disposition_date ?
						<div>
							<div className="label">
								<h4>Disposition Date</h4>
							</div>

							<div className="content">
								<p>{moment(`${offense.court.disposition_date.month}/${offense.court.disposition_date.day}/${offense.court.disposition_date.year}`, 'MM/DD/YYYY').format('ll')}</p>
							</div>
						</div>
					: null }


				</div>
			);
		});

		return (
			<main>
				<Header title="Case Details" buttonHandler={closeCrime} backButton />

				<div key={`${uuid.v4()}`} className="offender-header">
					<div className="offender-thumbnail">
						{ !this.state.errored && _.has(offender, 'mugshots[0].token') ?
							<img onError={this.handleError.bind(this)} src={ `${config.API_ROOT}/data/image/${offender.mugshots[0].token}` } />
							: <Svg svg="userAccount" style={{width: 34}} /> }
					</div>

					<h2 className="offender-name">{`${offender.name.first} ${offender.name.last}`}
						<br /><span className="offender-tag">{_.capitalize(offender.category)}</span>
					</h2>
				</div>

				<div key={`${uuid.v4()}`} className="widget">
					<h2 className="title">Case Details</h2>

					{/* Full Name */}
					<div className="label">
						<h4>Full Name</h4>
					</div>

					<div className="content">
						<p>{`${offender.name.first} ${offender.name.middle} ${offender.name.last}`}</p>
					</div>

					{ offender.case_filing_date ?
						<div>
							<div className="label">
								<h4>Case Filing Date</h4>
							</div>

							<div className="content">
								<p>{moment(`${offender.case_filing_date.month}/${offender.case_filing_date.day}/${offender.case_filing_date.year}`, 'MM/DD/YYYY').format('ll')}</p>
							</div>
						</div> 
						: null
					}

					{ offender.case_type_description ?
						<div>
							<div className="label">
								<h4>Case Type</h4>
							</div>

							<div className="content">
								<p>{offender.case_type_description}</p>
							</div> 
						</div>
						: null
					}

					{ offender.case_number ?
						<div>
							<div className="label">
								<h4>Case Number</h4>
							</div>

							<div className="content">
								<p>{offender.case_number}</p>
							</div> 
						</div>
						: null
					}

					{ offender.data_source || offender.data_source_name ?
						<div>
							<div className="label">
								<h4>Data Source</h4>
							</div>

							<div className="content">
								<p>{offender.data_source_name 
										? offender.data_source_name 
										: offender.data_source 
											? offender.data_source
											: null
								}</p>
							</div>
						</div>
					: null }

					{ offender.address ?
						<div>
							<div className="label">
								<h4>Offender's Address</h4>
							</div>

							<div className="content">
								<p>{offender.address.display}</p>
							</div> 
						</div>
						: null
					}

					{ offender.county_of_origin ?
						<div>
							<div className="label">
								<h4>County</h4>
							</div>

							<div className="content">
								<p>{offender.county_of_origin}</p>
							</div> 
						</div>
						: null
					}

					{/* Offenses */}
					{offenseDetails}

					<div className="label">
						<h4>Match Based On:</h4>
					</div>

					<div className="content offender-matches">
						{ offender.matching_fields['dob'] ?
							<p className="offender-match">Date of Birth</p>
								: null }

						{ offender.matching_fields['first'] ?
							<p className="offender-match">First Name</p>
								: null }

						{ offender.matching_fields['last'] ?
							<p className="offender-match">Last Name</p>
								: null }

						{ offender.matching_fields['middle'] ?
							<p className="offender-match">Middle Initial</p>
								: null }

						{ offender.matching_fields['city'] ?
							<p className="offender-match">City</p>
								: null }

						{ offender.matching_fields['state'] ?
							<p className="offender-match">State</p>
								: null }

						{ offender.matching_fields['zip_code'] ?
							<p className="offender-match">Zip Code</p>
								: null }
					</div>

					{ !_.isEmpty(offender.eyes) || !_.isEmpty(offender.hair) ?
						<SimpleInline
							key={`${uuid.v4()}`}
							title={['Eye Color', 'Hair Color']}
							contents={[offender.eyes, offender.hair]}
							classes="inline-half"
						/>
					: null }

					{ !_.isEmpty(offender.height) || !_.isEmpty(offender.weight) ?
						<SimpleInline
							key={`${uuid.v4()}`}
							title={['Height', 'Weight']}
							contents={[offender.height, `${offender.weight}lbs`]}
							classes="inline-half"
						/>
					: null }

					{ !_.isEmpty(offender.race) || !_.isEmpty(offender.sex) ?
						<SimpleInline
							key={`${uuid.v4()}`}
							title={['Race', 'Sex']}
							contents={[offender.race, offender.sex]}
							classes="inline-half"
						/>
					: null }
				</div>
			</main>
		);
	}
}

CrimeModal.propTypes = {
	closeCrime: React.PropTypes.func.isRequired,
	offender: React.PropTypes.object.isRequired,
};

export default CrimeModal;
