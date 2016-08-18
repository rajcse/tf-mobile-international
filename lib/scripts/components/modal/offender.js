import React, { Component } from 'react';
import _ from 'lodash';
import config from 'config';

import constants from '../../constants/pubRecConstants';
import SearchLink from '../SearchLink';

class OffenderLocation extends Component {
	render() {
		let {
			offender
		} = this.props;

		const fullName = `${offender.name.first} ${offender.name.middle} ${offender.name.last}`;

		// Mugshots
		let mugshot = '//placehold.it/300x300';

		if (!_.isNull(offender.image_token)) {
			mugshot = `${config.API_ROOT}/data/image/${offender.image_token}`;
		}

		return (
			<div className="offender-list">
				<div className="offender-thumbnail">
					<img src={ mugshot } />
				</div>

				<div className="offender-details">
					<h2>{fullName}</h2>

					{ offender.offense_description1 ?
						<p>{offender.offense_description1}</p>
					: null }

					<SearchLink
            classes="btn-link btn"
						criteria={{
							type: constants.recordTypes.PERSON,
							query: {
								firstName: offender.name.first,
								lastName: offender.name.last,
								state: offender.address.state_code
							},
							text: `${offender.name.first} ${offender.name.last}`
						}}>
            View Report
					</SearchLink>
				</div>
			</div>
		);
	}
}

OffenderLocation.propTypes = {
	offender: React.PropTypes.object.isRequired
};

export default OffenderLocation;
