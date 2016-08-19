import React, { Component } from 'react';
import _ from 'lodash';
import config from 'config';
import uuid from 'uuid';

import Header from '../shared/Header';
import LocalColumn from '../location/local';
import SimpleInline from '../shared/SimpleInline';

import viewActions from '../../actions/viewActions';

class OffenderModal extends Component {
	getLocationDetails(pointer) {
		return function() {
			viewActions.fetchLocationTeaser(pointer);
		};
	}

	render() {
		let {
			closeOffender,
		  offender
		} = this.props;

		// Mugshots
		let mugshot = '//placehold.it/300x300';

		if (!_.isNull(offender.image_token)) {
			mugshot = `${config.API_ROOT}/data/image/${offender.image_token}`;
		}

		return (
			<main>
				<Header title="Sex Offender" buttonHandler={closeOffender} backButton />

				<div className="offender-header">
					<div className="offender-thumbnail">
						<img src={ mugshot } />
					</div>

					<h2 className="offender-name">{`${offender.name.first} ${offender.name.middle} ${offender.name.last}`}</h2>
				</div>

				<div className="widget">
					<h2 className="title">Offense Report</h2>

					<div className="label">
						<h4>Offense</h4>
					</div>

					{offender.offense_description1}

					<hr />

					<div className="label">
						<h4>Location Details</h4>
					</div>

					<LocalColumn
						location={offender}
					/>

					<hr />
					<SimpleInline
						key={`${uuid.v1()}`}
						title={['Eye Color', 'Hair Color']}
						contents={[offender.eye_color, offender.hair_color]}
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

OffenderModal.propTypes = {
	closeOffender: React.PropTypes.func.isRequired,
	openLocation: React.PropTypes.func.isRequired,
	offender: React.PropTypes.object.isRequired,
};

export default OffenderModal;
