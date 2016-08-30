import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import config from '../../config';
import Svg from '../Svg';

class LocalColumn extends Component {
	render() {
		let {
			location,
			openLocation,
		} = this.props;

		const address = location.address;

		// Location not found
		let classes = _.isNull(address.coordinates.longitude) ? 'no-map' : '';

		// Get Mapbox Image
		let map = `https://api.mapbox.com/v4/mapbox.streets/${address.coordinates.longitude},${address.coordinates.latitude},14/300x70@2x.png?access_token=${config.MAPBOX_TOKEN}`;

		return (
			<div className="locations row">
				<div className={classNames('location-map', classes)}>
					{ !_.isNull(address.coordinates.longitude) ?
						<img src={map} />
							: <div>
								<Svg svg="mapPointer"/>
								<small>Map Image Not Found</small>
							</div>
					}
				</div>

				<div className="content content-full">
					<div className="location-details">
						<p>{`${address.street} ${address.city}`}
							{ !_.isNull(address.state_code) ?
								`, ${address.state_code}`
							: null }
						</p>
					</div>

					{ !_.isUndefined(openLocation) ?
						<div className="location-actions">
							<button onTouchTap={ () => { openLocation(location.key); location.getLocationDetails(); } } className="btn-link">
								Location Details
							</button>
						</div>
					: null }
				</div>
			</div>
		);
	}
}

LocalColumn.propTypes = {
	location: PropTypes.object.isRequired,
	openLocation: PropTypes.func
};

export default LocalColumn;
