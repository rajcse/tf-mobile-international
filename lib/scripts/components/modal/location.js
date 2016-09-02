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
			loadData: true
		};

		this.switchCrimeTab = this.switchCrimeTab.bind(this);
		this.switchSexTab = this.switchSexTab.bind(this);
		this.switchNeighborsTab = this.switchNeighborsTab.bind(this);
	}

	componentWillMount() {
		if(!_.isNull(this.props.record.reportData.locations[0].sex_offenders)) {
			this.setState({
				loadData: false
			});
		}
	}

	componentWillReceiveProps() {
		this.setState({
			loadData: false
		});
	}

	switchCrimeTab() {
		this.setState({
			crime: true,
			neighbors: false,
			sex: false
		});
	}

	switchSexTab() {
		this.setState({
			crime: false,
			sex: true,
			neighbors: false
		});
	}

	switchNeighborsTab() {
		this.setState({
			crime: false,
			neighbors: true,
			sex: false
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


	render() {
		let { record, closeLocation, openOffender, selected } = this.props;
		let { loadData } = this.state;
		_.map(record.reportData.locations, (location, index) => {
			if (location.key === selected && !_.isNull(location.sex_offenders)) {
				record = location;
			}
		});

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
						{record.address.display}
					</div>
					<hr />
					{/* SEX OFFENDERS */}
					{ this.state.sex ?
						_.isNull(record.sex_offenders) ?
							<div className="modal-loader">
								<Loader />
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
					<OwlCarousel slideSpeed={300} itemsCustom={[[0, 1.5]]} navigation={false} singleItem={false} autoPlay={false} >
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
	closeLocation: PropTypes.func.isRequired,
	openOffender: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired
};

export default LocationModal;
