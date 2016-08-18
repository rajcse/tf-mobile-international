import React, { Component, PropTypes } from 'react';
import config from '../../config';


class LocalColumn extends Component {
	render() {
		let {
			location,
			openLocation
		} = this.props;

		const address = location.address;

		// Get Mapbox Image
		let map = `//api.mapbox.com/v4/mapbox.streets/${address.coordinates.longitude},${address.coordinates.latitude},14/300x70@2x.png?access_token=${config.MAPBOX_TOKEN}`;

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

					<div className="location-actions">
						<button onTouchTap={ () => { openLocation(location.key); location.getLocationDetails(); } } className="btn-link">
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
