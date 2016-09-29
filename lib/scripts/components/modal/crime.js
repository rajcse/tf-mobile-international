import React, { Component } from 'react';
import _ from 'lodash';
import config from 'config';
import uuid from 'uuid';
import Svg from '../Svg';

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

		// Case Details
		let caseDetails = [];

		_.map(offender.offenses, (offense, index) => {
			caseDetails.push(
				<div key={index}>
					{ !_.isNull(offense.offense_date) ?
						<SimpleInline
							key={`${uuid.v4()}`}
							title={['Case Number', 'Date']}
							contents={[offense.case_number, constants.months[offense.offense_date.month] + ', ' + offense.offense_date.day + ' ' + offense.offense_date.year ]}
							classes="inline-half"
						/>
					: null }

					{ _.isNull(offender.address) ? null :
						_.isNull(offender.address.city) || _.isEmpty(offender.address.city) ? null :
							<div>
								<div className="label">
									<h4>Location Details</h4>
								</div>

								<div className="content">
									<p>
										<span>{offender.address.city},
											{ !state ? null :
											` ${state}` }
										</span>
									</p>
								</div>
							</div>
					}

					{ !_.isNull(offense.description) && !_.isEmpty(offense.description) ?
						<div>
							<div className="label">
								<h4>Description</h4>
							</div>

							<div className="content">
								<p>{offense.description}</p>
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
						{ !this.state.errored ?
							<img onError={this.handleError.bind(this)} src={ `${config.API_ROOT}/data/image/${offender.image_token}` } />
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

					{/* Case Details */}
					{caseDetails}

					<div className="label">
						<h4>Likely Match</h4>
					</div>

					<div className="content offender-matches">
						{ offender.matching_fields['dob'] ?
							<p className="offender-match">Date of Birth</p>
							: <p className="offender-no-match">Date of Birth</p> }

						{ offender.matching_fields['first'] ?
							<p className="offender-match">First Name</p>
							: <p className="offender-no-match">First Name</p> }

						{ offender.matching_fields['last'] ?
							<p className="offender-match">Last Name</p>
							: <p className="offender-no-match">Last Name</p> }

						{ offender.matching_fields['middle'] ?
							<p className="offender-match">Middle Initial</p>
							: <p className="offender-no-match">Middle Initial</p> }

						{ offender.matching_fields['city'] ?
							<p className="offender-match">City</p>
							: <p className="offender-no-match">City</p> }

						{ offender.matching_fields['state'] ?
							<p className="offender-match">State</p>
							: <p className="offender-no-match">State</p> }

						{ offender.matching_fields['zip_code'] ?
							<p className="offender-match">Zip Code</p>
							: <p className="offender-no-match">Zip Code</p> }
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
