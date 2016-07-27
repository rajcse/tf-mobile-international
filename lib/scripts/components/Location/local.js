import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import config from '../../config';

import OffenderColumn from  './offender';

class LocalColumn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			openLocationDetails: false,
			location: this.props.location
		}
	}

	render() {
		let {
			location,
			offender
		} = this.props;

		let {
			openLocationDetails
		} = this.state;

		const address = location.address;

		// Display date first and last seen
		let firstSeen, lastSeen;

		if (_.has(address, 'date_first_seen.date') && address.date_first_seen.date && address.date_last_seen.date) {
			firstSeen = {
	            month: address.date_first_seen.date.month - 1, // months are 0 indexed
	            day: address.date_first_seen.date.day,
	            year: address.date_first_seen.date.year
	        };
			lastSeen = {
	            month: address.date_last_seen.date.month - 1, // months are 0 indexed
	            day: address.date_last_seen.date.day,
	            year: address.date_last_seen.date.year
	        };
		} else if (_.has(address, 'date_first_seen.date_range') && address.date_first_seen.date_range && address.date_last_seen.date_range) {
	        firstSeen = {
	            month: address.date_first_seen.date_range.month - 1, // months are 0 indexed
	            day: address.date_first_seen.date_range.day,
	            year: address.date_first_seen.date_range.year
	        };
			lastSeen = {
	            month: address.date_last_seen.date_range.month - 1, // months are 0 indexed
	            day: address.date_last_seen.date_range.day,
	            year: address.date_last_seen.date_range.year
	        };
		}

		// Get Mapbox Image
		let map = `//api.mapbox.com/v4/mapbox.satellite/${address.coordinates.longitude},${address.coordinates.latitude},16/300x300.png?access_token=${config.MAPBOX_TOKEN}`;

		const offenders = location.sex_offenders;

		return (
			<div className='locations row'>
	      { firstSeen && lastSeen /* Basic check to avoid creating empty dates */ ?
	        <div className='label label-full'>
	          <small>{`${moment(firstSeen).format('LL')} - ${moment(lastSeen).format('LL')}`}</small>
	        </div>
	      : null }

				<div className="content content-full">
					<div className='location-details'>
						<h4>{address.display}</h4>
	          {offender >= 1 ?
	            <p className='location-warning'>
								<i className='icon-exclamation-triangle'></i> <strong>{offender}</strong> Sex Offenders near this location
							</p>
	          : null }
					</div>

					<div className='location-map'>
						<img src={map} />
					</div>

					{/* // Sex Offenders */}
					{ _.isEmpty(offenders) ? null :
						<div className='sex-offenders'>
							<h2 className='title'>Sex Offenders</h2>
							{	offenders.map((offender) => (
								<OffenderColumn {...offender} />
							)) }
						</div>
					}

					{ openLocationDetails ?
						<div>
							{/* // Sex Offenders */}
							{ _.isEmpty(offenders) ? null :
								<div className='sex-offenders'>
									<h2 className='title'>Sex Offenders</h2>
									{	offenders.map((offender) => (
										<OffenderColumn {...offender} />
									)) }
								</div>
							}

						</div>
					: null }

					<p><button onTouchTap={location.getLocationDetails} className='btn-link'>Location Details</button></p>
				</div>
			</div>
		);
	}
}

LocalColumn.propTypes = {
	location: PropTypes.object.isRequired,
	offender: PropTypes.number.isRequired
}

export default LocalColumn;
