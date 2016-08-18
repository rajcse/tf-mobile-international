import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import config from '../../config';

import OffenderColumn from  './offender';
import ChartBar from '../Shared/ChartBar';

class LocalColumn extends Component {
	render() {
		let {
			location,
			openLocation
		} = this.props;

		const address = location.address;

		// Get Mapbox Image
		let map = `//api.mapbox.com/v4/mapbox.streets/${address.coordinates.longitude},${address.coordinates.latitude},14/300x70@2x.png?access_token=${config.MAPBOX_TOKEN}`;

		const offenders = location.sex_offenders;
		const crime = location.crime;

		return (
			<div className="locations row">
				<div className="location-map">
					<img src={map} />
				</div>

				<div className="content content-full">
					<div className="location-details">
						<p>{address.street} <br/>
							{address.city}, {address.state_code}</p>
					</div>

					{ _.isEmpty(offenders) ? null :
						!_.isNull(offenders) ?
							<div className="location-modal">
								<div className="sex-offenders">
									<h2 className="title">Location Details
										<button onTouchTap={ () => { this.hideLocationDetails(); } } className="btn-link pull-right">
											Hide Details
										</button>
									</h2>

									{ !_.isNull(crime) ?
										<ChartBar data={crime} type="Line" />
									: null }

									<h2 className="sub-title">Sex Offenders</h2>
									{ offenders.map((offender, index) => (
										<OffenderColumn key={index} {...offender} />
									)) }
								</div>
							</div>
						: null
					}

					<div className="location-actions">
						<button onTouchTap={ () => { openLocation(); } } className="btn-link">
							Location Details
						</button>
					</div>
				</div>
			</div>
		);
	}
}

LocalColumn.propTypes = {
	location: PropTypes.object.isRequired,
	openLocation: PropTypes.func.isRequired
};

export default LocalColumn;
