import React, { Component } from 'react';
import _ from 'lodash';
import config from 'config';
import uuid from 'uuid';
import moment from 'moment';

import constants from '../../constants/pubRecConstants';

import Header from '../shared/Header';
import SimpleInline from '../shared/SimpleInline';
import SearchLink from '../SearchLink';

class CrimeModal extends Component {
	render() {
		let {
			closeCrime,
			offender
		} = this.props;

		// Mugshots
		let mugshot = null;

		if (!_.isNull(offender.image_token)) {
			mugshot = `${config.API_ROOT}/data/image/${offender.image_token}`;
		}

		// Match
		let match = '';

		if (offender.matching_fields.dob) {
			match = 'Most Likely Match';
		} else if (offender.matching_fields.state) {
			match = 'Likely Match';
		} else {
			match = 'Least Likely Match';
		}

		return (
			<main>
				<Header title="Case Details" buttonHandler={closeCrime} backButton />

				<div key={`${uuid.v1()}`} className="offender-header">
					{ !_.isNull(mugshot) ?
						<div className="offender-thumbnail">
							<img src={ mugshot } />
						</div>
					: null }

					<h2 className="offender-name">{`${offender.name.first} ${offender.name.last}`}
						<br /><span className="offender-tag">{match}</span>
					</h2>
				</div>

				<div key={`${uuid.v1()}`} className="widget">
					<h2 className="title">Case Details</h2>

					{/* Full Name */}
					<div className="label">
						<h4>Full Name</h4>
					</div>

					<div className="content">
						<p>{`${offender.name.first} ${offender.name.middle} ${offender.name.last}`}</p>

						<SearchLink
							criteria={{
								type: constants.recordTypes.PERSON,
								query: {
									firstName: offender.name.first,
									lastName: offender.name.last,
									state: offender.address.state_code
								},
								text: `${offender.name.first} ${offender.name.middle} ${offender.name.last}`
							}}
				classes="btn-link btn"> Phone Report
						</SearchLink>
					</div>

					{/* Case Number & Date */}
					{ _.map(offender.offenses, (offense, index) => {
						return (
							<div key={index}>
								{ !_.isNull(offense.offense_date) ?
									<SimpleInline
										key={`${uuid.v1()}`}
										title={['Case Number', 'Date']}
										contents={[offense.case_number, moment(`${offense.offense_date.month}${offense.offense_date.day}/${offense.offense_date.year}`, 'MM/DD/YYYY').format('LL') ]}
										classes="inline-half"
         />
								: null }

								<div className="label">
									<h4>Location Details</h4>
								</div>

								{ !_.isNull(offender.address) && !_.isNull(offender.address.state_code) ?
									<div className="content">
										<p>{`${offender.address.city}, ${offender.address.state_code}`}</p>
									</div>
								: null }

								<div className="label">
									<h4>Description</h4>
								</div>

								<div className="content">
									<p>{offense.description}</p>
								</div>
							</div>
						);
					})}

					<SimpleInline
						key={`${uuid.v1()}`}
						title={['Eye Color', 'Hair Color']}
						contents={[offender.eyes, offender.hair]}
						classes="inline-half"
		 />

					<SimpleInline
						key={`${uuid.v1()}`}
						title={['Height', 'Weight']}
						contents={[offender.height, `${offender.weight}lbs`]}
						classes="inline-half"
		 />

					<SimpleInline
						key={`${uuid.v1()}`}
						title={['Race', 'Sex']}
						contents={[offender.race, offender.sex]}
						classes="inline-half"
		 />
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
