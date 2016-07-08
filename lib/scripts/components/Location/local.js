import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';

const LocalColumn = (props) => {
	let { location } = props;
	let firstSeen, lastSeen;

	if (_.has(location, 'date_first_seen.date') && location.date_first_seen.date && location.date_last_seen.date) {
		firstSeen = `${location.date_first_seen.date.month}/
					${location.date_first_seen.date.day}/
					${location.date_first_seen.date.year}`;
		lastSeen = `${location.date_last_seen.date.month}/
					${location.date_last_seen.date.day}/
					${location.date_last_seen.date.year}`;
	} else if (_.has(location, 'date_first_seen.date_range') && location.date_first_seen.date_range && location.date_last_seen.date_range) {
		firstSeen = `${location.date_first_seen.date_range.start.month}/
					${location.date_first_seen.date_range.start.day}/
					${location.date_first_seen.date_range.start.year}`;
		lastSeen = `${location.date_last_seen.date_range.start.month}/
					${location.date_last_seen.date_range.start.day}/
					${location.date_last_seen.date_range.start.year}`;
	}

	const mapboxToken = 'pk.eyJ1IjoidGhlY29udHJvbGdyb3VwIiwiYSI6ImNpZW9zcHRxdDBoendzM2ttNm1tdDAzY3AifQ.ZibEsq1WAjWEztnvnJBH_g';

	let map = `//api.mapbox.com/v4/mapbox.satellite/${location.coordinates.longitude},${location.coordinates.latitude},16/300x300.png?access_token=${mapboxToken}`

	return (
		<div className='locations row'>
			<div className='label label-full'>
				<small>{`${moment(firstSeen).format('LL')} - ${moment(lastSeen).format('LL')}`}</small>
			</div>

			<div className="content content-full">
				<div className='location-details'>
					<h4>{location.display}</h4>
					<p><a href='#'>Location Details</a></p>
					<p><a href='#'>() Sex Offenders</a></p>
				</div>

				<div className='location-map'>
					<img src={map} />
				</div>
			</div>
		</div>
	);
}

LocalColumn.propTypes = {
	location: PropTypes.object.isRequired,
	map: PropTypes.string
}

export default LocalColumn;
