import React, { Component, PropTypes } from 'react';
import OwlCarousel from 'react-owl-carousel';
import _ from 'lodash';
import config from 'config';
import constants from '../../constants/pubRecConstants';
import moment from 'moment';

import Header from '../shared/Header';
import Loader from '../shared/Loader';
import ChartBar from '../shared/ChartBar';
import SearchLink from '../SearchLink';
import SimpleInline from '../shared/SimpleInline';
import uuid from 'uuid';
import SimpleRow from '../shared/SimpleRow';

class LocationModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sex: true,
			crime: false,
			neighbors: false,
			loadData: true,
			record: {}
		};

		this.switchCrimeTab = this.switchCrimeTab.bind(this);
		this.switchSexTab = this.switchSexTab.bind(this);
		this.switchNeighborsTab = this.switchNeighborsTab.bind(this);
		this._getCurrentLocation = this._getCurrentLocation.bind(this);
		this._updateNav = this._updateNav.bind(this);
	}

	componentWillMount() {
		this._getCurrentLocation();
		if(!_.isNull(this.props.record.reportData.locations[0].sex_offenders)) {
			this.setState({
				loadData: false
			});
		}
	}

	componentWillReceiveProps() {
		this._getCurrentLocation();
		this.setState({
			loadData: false
		});
	}

	switchSexTab() {
		this.setState({
			crime: false,
			sex: true,
			neighbors: false
		});

		setTimeout(() => this._updateNav(0), 0);
	}

	switchNeighborsTab() {
		this.setState({
			crime: false,
			neighbors: true,
			sex: false
		});

		setTimeout(() => this._updateNav(1), 0);
	}

	switchCrimeTab() {
		this.setState({
			crime: true,
			neighbors: false,
			sex: false
		});

		setTimeout(() => this._updateNav(2), 0);
	}

	calculateAge(date) {
		// Check if dob exist
		if (_.isNull(date) || _.isEmpty(date)) {
			return null;
		}

		// Format Date
		date = moment(`${date.month}/${date.day}/${date.year}`, 'MM/DD/YYYY');
		return moment().diff(date, 'years');
	}

	_getCurrentLocation() {
		_.map(this.props.record.reportData.locations, (location, index) => {
			if (location.key === this.props.selected && location['@provider'].indexOf('location') !== -1) {
				this.setState({
					record: this.props.record.reportData.locations[index]
				});
			}
		});
	}

	_updateNav(index) {
		// Get item width
		let navWidthItem = document.querySelector('.modal-tab .owl-wrapper .owl-item').offsetWidth;
		// Calculate carousel bar movement based on item width and index
		let calcMove = index * navWidthItem;
		// Update CSS Transform to keep active tab in view
		document.querySelector('.modal-tab .owl-wrapper').style.transform = `translate3d(-${calcMove}px,0,0)`;
	}

	render() {
		let { closeLocation, openOffender } = this.props;
		let { record, loadData } = this.state;

		let modalNode;

		{ loadData ?
			modalNode = (
				<div className="modal-loader">
					<h3>Gathering Location Stats</h3>
					<Loader />
				</div>
			)
		: modalNode = (
			<div className="modal-container">
				<div className={'widget ' + (this.state.neighbors ? ' premium' : '')}>
					<h2 className="title">{this.state.sex ? 'Sex Offenders' : ( !this.state.crime ? 'Possible Neighbors' : 'Crime Statistics')}</h2>

					<div className="label">
						<h4>Near</h4>
						<p>{record.address.street}</p>
						<p>{record.address.city ? record.address.city : null}
							{record.address.state_code ? `, ${record.address.state_code}` : null}
							{record.address.zip_code ? `, ${record.address.zip_code}` : null}
						</p>

					</div>
					<hr />
					{/* SEX OFFENDERS */}
					{ this.state.sex ?
						_.isNull(record.sex_offenders) ?
							<div className="modal-loader">
								No Possible Sex Offenders
							</div>
						: _.map(record.sex_offenders, (offender, index) => {
							const fullName = `${offender.name.first} ${offender.name.middle} ${offender.name.last}`;

							// Mugshots
							let mugshot = '//placehold.it/300x300';

							if (!_.isNull(offender.image_token)) {
								mugshot = `${config.API_ROOT}/data/image/${offender.image_token}`;
							}

							return (
								<div key={index} className="offender-list">
									<div className="offender-thumbnail">
										<img src={ mugshot } />
									</div>

									<div className="offender-details">
										<h2>{fullName}</h2>

										{ offender.offense_description1 ?
											<p>{offender.offense_description1}</p>
										: null }

										<button className="btn btn-link" onTouchTap={() => { openOffender(offender); }}>
											View Report
										</button>
									</div>
								</div>
							);
						})
					: null }

					{/* CENSUS DATA */}
					{this.state.crime ?
						!_.isNull(record.crime) ?
							<ChartBar data={record.crime} type="Line" />
						: 'No Criminal Records'
					: null }
					{/* Neighbors */}
					{this.state.neighbors ?
						_.isNull(record.neighborsList) ?
							<div className="modal-loader">
								No Possible Neighbors
							</div>
						: _.map(record.neighborsList, (neighbor, index) => {

							const dob = _.head(neighbor.dobs);
							const date = !_.isUndefined(dob) && !_.isNull(dob.date) ? dob.date : null;
							const age = this.calculateAge(date);

							return (
								<div key={index} className="widget">
									<h2 className="title">{neighbor.names[0].display}</h2>

									{ neighbor.available_criminal_records >= 1 ?
										<p>
											<small><strong>({neighbor.available_criminal_records}) </strong>
												Possible Criminal Records
											</small>
										</p>
									: null }
									{ date ?
										<SimpleInline
											key={uuid.v4()}
											title={['Date of Birth', 'Age']}
											contents={[
												`${constants.months[date.month]}, ${date.day} ${date.year}`,
												age
											]}
											classes="inline-half"
										/>
									: null }

									{ _.has(neighbor,'locations[0].address.display') ?
										<SimpleRow
											key={uuid.v4()}
											title="Address"
											content={neighbor.locations[0].address.display}
										/>
									: null }

									<SearchLink
										criteria={{
											type: constants.recordTypes.PERSON,
											query: {
												firstName: neighbor.names[0].first,
												lastName: neighbor.names[0].last,
												state: neighbor.locations[0].address.state_code
											},
											text: neighbor.names[0].display
										}}
									classes="btn-link btn"> View Person Report
									</SearchLink>
								</div>
							);
						})
					: null }
				</div>
			</div>
		); }

		return (
			<main>
				<Header title="Location Details" buttonHandler={closeLocation} backButton />

				<div className="modal-tab">
					<OwlCarousel slideSpeed={300} itemsCustom={[[0, 1.875]]} navigation={false} singleItem={false} autoPlay={false}>
						<div onClick={this.switchSexTab} className={this.state.sex ? 'active' : null}>Sex Offenders</div>
						{record.isPremium ? <div onClick={this.switchNeighborsTab} className={this.state.neighbors ? 'active' : null}>Possible Neighbors</div> : null}
						<div onClick={this.switchCrimeTab} className={this.state.crime ? 'active' : null}>Crime Statistics</div>
					</OwlCarousel>
				</div>

				{modalNode}
			</main>
		);
	}
}

LocationModal.propTypes = {
	record: PropTypes.object.isRequired,
	selected: PropTypes.string.isRequired,
	closeLocation: PropTypes.func.isRequired,
	openOffender: PropTypes.func.isRequired
};

export default LocationModal;
