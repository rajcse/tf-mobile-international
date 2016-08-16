import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import config from '../../config';

import OffenderColumn from  './offender';
import ChartBar from '../Shared/ChartBar';

class LocalColumn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			location: this.props.location
		}

		this.loadLocationDetails = this.loadLocationDetails.bind(this, true);
		this.hideLocationDetails = this.hideLocationDetails.bind(this, false);
	}

	loadLocationDetails() {
		this.setState({
			isLoading: true,
			isVisible: true,
		});
	}

	hideLocationDetails() {
		this.setState({
			isVisible: false
		});
	}

	componentWillMount() {
		this.setState({
			isLoading: false,
			isVisible: false
		});
	}

	componentWillReceiveProps() {
		this.setState({
			isLoading: false
		});
	}

	render() {
		let {
			location,
			offender
		} = this.props;

		let {
			isLoading,
			isVisible
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
		let map = `//api.mapbox.com/v4/mapbox.streets/${address.coordinates.longitude},${address.coordinates.latitude},14/300x70@2x.png?access_token=${config.MAPBOX_TOKEN}`;

		const offenders = location.sex_offenders;
		const crime = location.crime;

		return (
			<div className='locations row'>
				<div className='location-map'>
					<img src={map} />
				</div>

				<div className="content content-full">
					<div className='location-details'>
						<p>{address.street} <br/>
							{address.city}, {address.state_code}</p>
					</div>

					{ _.isEmpty(offenders) || !isVisible ? null :
						!_.isNull(offenders) ?
							<div className='location-modal'>
								<div className='sex-offenders'>
									<h2 className='title'>Location Details
										<button onTouchTap={ () => { this.hideLocationDetails(); } } className='btn-link pull-right'>
											Hide Details
										</button>
									</h2>

									{ !_.isNull(crime) ?
										<ChartBar data={crime} type="Line" />
									: null }

									<h2 className='sub-title'>Sex Offenders</h2>
									{ offenders.map((offender, index) => (
										<OffenderColumn key={index} {...offender} />
									)) }
								</div>
							</div>
						: null
					}

					<div className='location-actions'>
						{ isLoading ?
							<div className='progress'>
								<span className='animate'></span>
							</div> : <p>
								<button onTouchTap={ () => { this.loadLocationDetails(); location.getLocationDetails(); } } className='btn-link'>
									Location Details
								</button>
							</p>
						}
					</div>
				</div>
			</div>
		);
	}
}

LocalColumn.propTypes = {
	location: PropTypes.object.isRequired,
	crime: PropTypes.object,
	offender: PropTypes.number
}

export default LocalColumn;
