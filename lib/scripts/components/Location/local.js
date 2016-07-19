import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import config from '../../config';
 
const LocalColumn = (props) => {
	let { location, offender } = props;
		
	// Display date first and last seen
	let firstSeen, lastSeen;

	if (_.has(location, 'date_first_seen.date') && location.date_first_seen.date && location.date_last_seen.date) {
		firstSeen = {
            month: location.date_first_seen.date.month - 1, // months are 0 indexed
            day: location.date_first_seen.date.day,
            year: location.date_first_seen.date.year
        };
		lastSeen = {
            month: location.date_last_seen.date.month - 1, // months are 0 indexed
            day: location.date_last_seen.date.day,
            year: location.date_last_seen.date.year
        };
	} else if (_.has(location, 'date_first_seen.date_range') && location.date_first_seen.date_range && location.date_last_seen.date_range) {
        firstSeen = {
            month: location.date_first_seen.date_range.month - 1, // months are 0 indexed
            day: location.date_first_seen.date_range.day,
            year: location.date_first_seen.date_range.year
        };
		lastSeen = {
            month: location.date_last_seen.date_range.month - 1, // months are 0 indexed
            day: location.date_last_seen.date_range.day,
            year: location.date_last_seen.date_range.year
        };
	}

	// Get Mapbox Image
	let map = `//api.mapbox.com/v4/mapbox.satellite/${location.coordinates.longitude},${location.coordinates.latitude},16/300x300.png?access_token=${config.MAPBOX_TOKEN}`

	// Render Sex Offender Details
	let offender_count;

	if (offender.sex_offenders_count) {
		offender_count = <p>
			<button className='btn-link'>({offender.sex_offenders_count}) Sex Offenders</button>
		</p>;
	}

	return (
		<div className='locations row'>
			<div className='label label-full'>
				<small>{ firstSeen && lastSeen /* Basic check to avoid creating empty dates */ ? `${moment(firstSeen).format('LL')} - ${moment(lastSeen).format('LL')}` : null}</small>
			</div>

			<div className="content content-full">
				<div className='location-details'>
					<h4>{location.display}</h4>
				</div>

				<div className='location-map'>
					<img src={map} />
				</div>

				<p><button onTouchTap={location.getLocationDetails} className='btn-link'>Location Details</button></p>
				{/*{offender_count}*/}
			</div>
		</div>
	);
}

LocalColumn.propTypes = {
	location: PropTypes.object.isRequired,
	offender: PropTypes.object.isRequired
}

export default LocalColumn;
