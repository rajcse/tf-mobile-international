import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import _ from 'lodash';
import { RouteTransition } from 'react-router-transition';
import uuid from 'uuid';
import Svg from 'components/svg/Svg';
import moment from 'moment';
import config from 'config';

import Header from 'components/shared/Header';
import SimpleInline from 'components/shared/SimpleInline';
import constants from 'constants/pubRecConstants';

class CrimeModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hiddenImage: false
		};

		this._handleError = this._handleError.bind(this);
		this._checkCriminalExist = this._checkCriminalExist.bind(this);
	}

	componentWillMount() {
		this._checkCriminalExist();
	}

	_checkCriminalExist() {
		// Check if offender is being loaded on enter or coming from link
		if(!_.has(this.props.criminal, 'offenses')) {
			hashHistory.goBack();
		}
	}

	_handleError() {
		this.setState({
			hiddenImage: true
		});
	}

	render() {
		let {
			criminal
		} = this.props;

		// Case Details
		let offenseDetails = [];

		_.map(criminal.offenses, (offense, index) => {
			let caseNumber = offense.case_number
				? offense.case_number
				: _.has(offense, 'court.case_number') && offense.court.case_number
					? offense.court.case_number
					: criminal.case_number
						? criminal.case_number
						: null;

			let offenseDescriptions = offense.description
				? offense.description.split('<Br>')
				: null;
			offenseDetails.push(
				<div key={index} className="offense-detail widget">
					<h3 className="title">Offense Details</h3>
					{ offense.offense_date ?
						<SimpleInline
							key={`${uuid.v4()}`}
							title={['Case Number', 'Date']}
							contents={[caseNumber, constants.months[offense.offense_date.month] + ', ' + offense.offense_date.day + ' ' + offense.offense_date.year ]}
							classes="inline-half"
						/>
					: null }


					{ offenseDescriptions ?
						<div>
							<div className="label">
								<h4>Description</h4>
							</div>

							<div className="content">
								{
									_.map(offenseDescriptions, (description) => {
										return <p key={`${uuid.v4()}`}>{description}.</p>;
									})
								}
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
				<Header title="Case Details" backButton />

				{/* Prevent rendering pages caught by redirect */}
				{ _.has(criminal, 'name') ?
					<RouteTransition
						component="div"
						runOnMount={true}
						pathname={this.props.location.pathname}
						className="transition-wrapper"
						atEnter={{ translateX: 100 }}
						atLeave={{ translateX: -100 }}
						atActive={{ translateX: 0 }}
						mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}
					>
						<div key={`${uuid.v4()}`} className="offender-header">
							<div className="offender-thumbnail">
								{ !this.state.hiddenImage && _.has(criminal, 'mugshots[0].token') ?
									<img onError={this._handleError} src={ `${config.API_ROOT}/data/image/${criminal.mugshots[0].token}` } />
									: <Svg svg="userAccount" style={{width: 34}} /> }
							</div>

							<h2 className="offender-name">{`${criminal.name.first} ${criminal.name.last}`}
								<br /><span className="offender-tag">{_.capitalize(criminal.category)} Match</span>
							</h2>
						</div>

						<div key={`${uuid.v4()}`} className="widget">
							<h2 className="title">Case Details</h2>

							{/* Full Name */}
							<div className="label">
								<h4>Full Name</h4>
							</div>

							<div className="content">
								<p>{`${criminal.name.first} ${criminal.name.middle} ${criminal.name.last}`}</p>
							</div>

							{ criminal.case_filing_date ?
								<div>
									<div className="label">
										<h4>Case Filing Date</h4>
									</div>

									<div className="content">
										<p>{moment(`${criminal.case_filing_date.month}/${criminal.case_filing_date.day}/${criminal.case_filing_date.year}`, 'MM/DD/YYYY').format('ll')}</p>
									</div>
								</div>
								: null
							}

							{ criminal.case_type_description ?
								<div>
									<div className="label">
										<h4>Case Type</h4>
									</div>

									<div className="content">
										<p>{criminal.case_type_description}</p>
									</div>
								</div>
								: null
							}

							{ criminal.case_number ?
								<div>
									<div className="label">
										<h4>Case Number</h4>
									</div>

									<div className="content">
										<p>{criminal.case_number}</p>
									</div>
								</div>
								: null
							}

							{ criminal.data_source || criminal.data_source_name ?
								<div>
									<div className="label">
										<h4>Data Source</h4>
									</div>

									<div className="content">
										<p>{criminal.data_source_name
											? criminal.data_source_name
											: criminal.data_source
											? criminal.data_source
											: null
										}</p>
									</div>
								</div>
							: null }

							{ criminal.address ?
								<div>
									<div className="label">
										<h4>Offender's Address</h4>
									</div>

									<div className="content">
										<p>{criminal.address.display}</p>
									</div>
								</div>
								: null
							}

							{ criminal.county_of_origin ?
								<div>
									<div className="label">
										<h4>County</h4>
									</div>

									<div className="content">
										<p>{criminal.county_of_origin}</p>
									</div>
								</div>
								: null
							}

							<div className="label">
								<h4>Match Based On:</h4>
							</div>

							<div className="content offender-matches">
								{ criminal.matching_fields['dob'] ?
									<p className="offender-match">Date of Birth</p>
								: null }

								{ criminal.matching_fields['first'] ?
									<p className="offender-match">First Name</p>
								: null }

								{ criminal.matching_fields['last'] ?
									<p className="offender-match">Last Name</p>
								: null }

								{ criminal.matching_fields['middle'] ?
									<p className="offender-match">Middle Initial</p>
								: null }

								{ criminal.matching_fields['city'] ?
									<p className="offender-match">City</p>
								: null }

								{ criminal.matching_fields['state'] ?
									<p className="offender-match">State</p>
								: null }

								{ criminal.matching_fields['zip_code'] ?
									<p className="offender-match">Zip Code</p>
								: null }
							</div>

							{ !_.isEmpty(criminal.eyes) || !_.isEmpty(criminal.hair) ?
								<SimpleInline
									key={`${uuid.v4()}`}
									title={['Eye Color', 'Hair Color']}
									contents={[criminal.eyes, criminal.hair]}
									classes="inline-half"
								/>
							: null }

							{ !_.isEmpty(criminal.height) || !_.isEmpty(criminal.weight) ?
								<SimpleInline
									key={`${uuid.v4()}`}
									title={['Height', 'Weight']}
									contents={[criminal.height, `${criminal.weight}lbs`]}
									classes="inline-half"
								/>
							: null }

							{ !_.isEmpty(criminal.race) || !_.isEmpty(criminal.sex) ?
								<SimpleInline
									key={`${uuid.v4()}`}
									title={['Race', 'Sex']}
									contents={[criminal.race, criminal.sex]}
									classes="inline-half"
								/>
							: null }
						</div>

						{/* Offenses */}
						{offenseDetails}
					</RouteTransition>
				: null }
			</main>
		);
	}
}

CrimeModal.propTypes = {
	criminal: React.PropTypes.object,
	location: React.PropTypes.object
};

export default CrimeModal;
