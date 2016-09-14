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

		this._getCurrentLocation = this._getCurrentLocation.bind(this);
		this._updateNav = this._updateNav.bind(this);
		this._switchTab = this._switchTab.bind(this);
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

	_switchTab(tab, index) {
		// Sets the active tab
		this.setState({
			crime: ('crime' === tab),
			sex: ('sex' === tab),
			neighbors: ('neighbor' === tab)
		});

		// Animates to active tab based on index used in calculation
		setTimeout(() => this._updateNav(index), 0);
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

					{/* Sex Offenders */}
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

										<button className="btn btn-link" onClick={() => { openOffender(offender); }}>
											View Report
										</button>
									</div>
								</div>
							);
						})
					: null }

					{/* Census Data */}
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

		// Iterate over each tab object to get the key associated with each for animation
		let tabsView = [],
			tabs = [{
				name: 'sex',
				visible: true,
				title: 'Sex Offenders',
			}, {
				name: 'neighbors',
				visible: record.isPremium,
				title: 'Possible Neighbors',
			}, {
				name: 'crime',
				visible: true,
				title: 'Crime Statistics'
			}];

		// Only use active tabs in array - avoid index error
		tabs = _.filter(tabs, function(o) { return o.visible; });

		_.map(tabs, (tab, key) => {
			let { name, visible, title } = tab;
			if(visible) {
				tabsView.push(
					<div onClick={() => this._switchTab(name, key)} className={this.state[name] ? 'active' : null}>
						{title}
					</div>
				);
			}
		});

		return (
			<main>
				<Header title="Location Details" buttonHandler={closeLocation} backButton />

				<div className="modal-tab">
					<OwlCarousel slideSpeed={300} itemsCustom={[[0, 1.875]]} navigation={false} singleItem={false} autoPlay={false}>
						{tabsView}
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
