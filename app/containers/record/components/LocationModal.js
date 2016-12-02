import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import OwlCarousel from 'react-owl-carousel';
import { RouteTransition } from 'react-router-transition';
import _ from 'lodash';
import constants from 'constants/pubRecConstants';
import moment from 'moment';
import uuid from 'uuid';
import config from 'config';

import Header from 'components/Header';
import Loader from 'components/Loader';
import ChartBar from 'components/ChartBar';
import SearchLink from 'components/SearchLink';
import SimpleInline from 'components/SimpleInline';
import SimpleRow from 'components/SimpleRow';
import Svg from 'components/svg/Svg';

class LocationModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sex: true,
			crime: false,
			neighbors: false,
			loadData: true,
			record: {},
			hiddenImages: []
		};

		this._getCurrentLocation = this._getCurrentLocation.bind(this);
		this._updateNav = this._updateNav.bind(this);
		this._switchTab = this._switchTab.bind(this);
	}

	componentWillMount() {
		this._getCurrentLocation();
	}

	componentWillReceiveProps() {
		this._getCurrentLocation();

		this.setState({
			loadData: false
		});
	}

	componentWillUnmount() {
		this.setState({
			loadData: true,
			record: {}
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
		// Check if location is being loaded on enter or coming from link
		if(_.isNull(this.props.locationId)) {
			hashHistory.goBack();
		}

		_.map(this.props.record.reportData.locations, (location) => {
			if (location.key === this.props.locationId && location['@provider'].indexOf('location') !== -1) {
				this.setState({
					record: location,
					loadData: false
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
			neighbors: ('neighbors' === tab)
		});

		// Animates to active tab based on index used in calculation
		setTimeout(() => this._updateNav(index), 0);
	}

	// Remove photos that don't load
	handleError(index) {
		let brokenImages = [index, ...this.state.hiddenImages];

		this.setState({
			hiddenImages: brokenImages
		});
	}

	render() {
		let { openOffender } = this.props;
		let { record, loadData, hiddenImages } = this.state;

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
						{_.isUndefined(record.address) ? null : <p>{record.address.street}</p>}
						{_.isUndefined(record.address)
							? null
							: <p>{record.address.city}
								{record.address.state_code ? `, ${record.address.state_code}` : null}
								{record.address.zip_code ? `, ${record.address.zip_code}` : null}
							</p>
						}
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

							return (
								<div key={index} className="offender-list">
									<div className="offender-thumbnail">
										{ !_.includes(hiddenImages, index) ?
											<img onError={this.handleError.bind(this, index)} src={ `${config.API_ROOT}/data/image/${offender.image_token}` } />
											: <Svg svg="userAccount" style={{width: 34}} />
										}
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
				title: 'Sex Offenders'
			}, {
				name: 'neighbors',
				visible: record.isPremium,
				title: 'Possible Neighbors'
			}, {
				name: 'crime',
				visible: true,
				title: 'Crime Statistics'
			}];

		// Only use active tabs in array - avoid index error
		tabs = _.filter(tabs, tab => (tab.visible));

		_.map(tabs, (tab, key) => {
			let { name, visible, title } = tab;
			if(visible) {
				tabsView.push(
					<div key={uuid.v4()} onClick={() => this._switchTab(name, key)} className={this.state[name] ? 'active' : null}>
						{title}
					</div>
				);
			}
		});

		return (
			<main>
				<Header title="Location Details" backButton />

				<RouteTransition
					component="div"
					runOnMount={true}
					pathname={this.props.location.pathname}
					className="transition-wrapper"
					atEnter={{ translateX: 100 }}
					atLeave={{ translateX: -100 }}
					atActive={{ translateX: 0 }}
					mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}
				>
					<div className="modal-tab">
						<OwlCarousel slideSpeed={300} itemsCustom={[[0, 1.875]]} navigation={false} singleItem={false} autoPlay={false}>
							{tabsView}
						</OwlCarousel>
					</div>

					{modalNode}
				</RouteTransition>
			</main>
		);
	}
}

LocationModal.propTypes = {
	record: PropTypes.object,
	openOffender: PropTypes.func,
	params: PropTypes.object,
	location: PropTypes.object,
	locationId: PropTypes.any
};

export default LocationModal;
