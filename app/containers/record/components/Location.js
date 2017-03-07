import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import 'whatwg-fetch';
import classNames from 'classnames';
import Svg from 'components/svg/Svg';
import config from 'config';

class Location extends Component {
	constructor(props) {
		super(props);

		this.state = {
			map: null,
			error: false
		};

		this._getLocationCoordinates = this._getLocationCoordinates.bind(this);
		this._generateMapUrl = this._generateMapUrl.bind(this);
		this._onClick = this._onClick.bind(this);
	}

	componentWillMount() {
		let { location } = this.props;

		// If Coordinates are null use mapbox api to get coordinates of city/state
		_.isNull(location.address.coordinates.longitude) ? this._getLocationCoordinates(location.address) : this._generateMapUrl(location.address.coordinates);
	}

	// Get city/state coordinates
	_getLocationCoordinates(address) {
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

				this._generateMapUrl(address);
			})
			.catch(() => {
				this.setState({
					error: true
				});
			});
	}

	_generateMapUrl(address) {
		// Get Mapbox Image
		let coordinates = `https://api.mapbox.com/v4/mapbox.streets/${address.longitude},${address.latitude},12/300x130@2x.png?access_token=${config.MAPBOX_TOKEN}`;

		this.setState({
			map: coordinates,
			error: false
		});
	}

	// Only add onclick functionality to reports with necessary data
	_onClick(location) {
		_.isUndefined(this.props.openLocation) ? null : (
			location.getLocationDetails(location),
			this.props.openLocation(location.key)
		);
	}

	render() {
		let {
			location,
			openLocation
		} = this.props;

		const address = location.address;

		// Location not found
		let classes = this.state.error ? 'no-map' : '';

		return (
			<div className="locations row">
				<div className={classNames('location-map', classes)} onClick={ () => this._onClick(location) }>
					<div>
						<Svg svg="mapLocation" style={{width: 30}}/>
						{ !this.state.error ?
							<img src={this.state.map} /> : <small>Map Image Not Found</small>
						}

						<div className="location-address">
							<p>{address.street}</p>
							<p>{address.city}
								{ !_.isNull(address.state_code) ?
									`, ${address.state_code}`
								: null }
							</p>
						</div>
					</div>
					{_.isUndefined(openLocation)
						? null
						: <button className="btn-location with-arrow">View Neighbors & Crime Data</button>
					}
				</div>

				{_.isUndefined(openLocation)
					? null
					: <div className="content content-full">
						<div className="location-details">
							<p>To view registered Sex Offenders and their crimes for this area, tap below.</p>
						</div>
						{ location.sex_offenders_count ?
							<div className="location-actions">
								<button onClick={ () => {
									location.getLocationDetails(location);
									openLocation(location.key);
								} } className="btn-link with-arrow down">View <strong>{location.sex_offenders_count}</strong> Sex Offender{location.sex_offenders_count > 1 ? 's' : ''} </button>
							</div>
						: null }
					</div>
				}
			</div>
		);
	}
}

Location.propTypes = {
	location: PropTypes.object.isRequired,
	params: PropTypes.object,
	openLocation: PropTypes.func
};

export default Location;
