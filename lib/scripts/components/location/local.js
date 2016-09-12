import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import 'whatwg-fetch';
import classNames from 'classnames';
import config from '../../config';
import Svg from '../Svg';

class LocalColumn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			map: null,
			error: false
		};

		this.getLocationDetails = this.getLocationDetails.bind(this);
		this.generateMapUrl = this.generateMapUrl.bind(this);
	}

	componentWillMount() {
		let { location } = this.props;

		// If Coordinates are null use mapbox api to get coordinates of city/state
		_.isNull(location.address.coordinates.longitude) ? this.getLocationDetails(location.address) : this.generateMapUrl(location.address.coordinates);
	}

	// Get city/state coordinates
	getLocationDetails(address) {
		let city = _.isNull(address.city) ? '' : encodeURI(address.city);
		let state = _.isNull(address.state) ? '' : encodeURI(address.state);

		fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city},${state}}.json?access_token=${config.MAPBOX_TOKEN}`)
			.then((response) => {
				return response.json();
			})
			.then((json) => {
				let address =  {
					longitude: json.features[0].geometry.coordinates[0],
					latitude: json.features[0].geometry.coordinates[1]
				};

				this.generateMapUrl(address);
			})
			.catch(() => {
				this.setState({
					error: true
				});
			});
	}

	generateMapUrl(address) {
		// Get Mapbox Image
		let coordinates = `https://api.mapbox.com/v4/mapbox.streets/${address.longitude},${address.latitude},12/300x160@2x.png?access_token=${config.MAPBOX_TOKEN}`;

		this.setState({
			map: coordinates,
			error: false
		});
	}

	render() {
		let {
			location,
			openLocation,
		} = this.props;

		const address = location.address;

		// Location not found
		let classes = this.state.error ? 'no-map' : '';

		return (
			<div className="locations row">
				<div className={classNames('location-map', classes)}>
					<div>
						<Svg svg="mapPointer" style={{width: 30}}/>
						{ !this.state.error ?
							<img src={this.state.map} /> :
							<small>Map Image Not Found</small>
						}
					</div>
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
