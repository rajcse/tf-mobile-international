import React, { Component, PropTypes } from 'react';
import OwlCarousel from 'react-owl-carousel';
import _ from 'lodash';

import Header from '../shared/Header';
import Loader from '../Shared/Loader';
import ChartBar from '../Shared/ChartBar';

import OffenderLocation from './offender';

class LocationModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sex: true,
			crime: false,
			isLoading: true
		};

		this.switchCrimeTab = this.switchCrimeTab.bind(this);
		this.switchSexTab = this.switchSexTab.bind(this);
	}

	componentWillReceiveProps() {
		// Update state when location details is updated
		this.setState({
			isLoading: false
		});
	}

	switchCrimeTab() {
		this.setState({
			crime: true,
			sex: false
		});
	}

	switchSexTab() {
		this.setState({
			crime: false,
			sex: true
		});
	}

	render() {
		let { record, closeLocation, selected } = this.props;
		let { isLoading } = this.state;

		_.map(record.reportData.locations, (location, index) => {
			if (location.key === selected) {
				record = record.reportData.locations[index];
			}
		});

		let modalNode;

		{ isLoading ?
			modalNode = (
				<div className="modal-loader">
					<h3>Gathering Location Stats</h3>
					<Loader />
				</div>
			)
		: modalNode = (<div className="modal-container">
			<div className="widget">
				<h2 className="title">{this.state.sex ? 'Sex Offenders' : 'Crime Statistics'}</h2>

				<div className="label">
					<h4>Near</h4>
					{record.address.display}

					<hr />
					{/* SEX OFFENDERS */}
					{ this.state.sex ?
						_.map(record.sex_offenders, (offender, index) => {
							return (<OffenderLocation
								key={index}
								offender={offender}
              />);
						})
					: null }

					{/* CENSUS DATA */}
					{this.state.crime ?
						!_.isNull(record.crime) ?
							<ChartBar data={record.crime} type="Line" />
						: 'No Criminal Records'
					: null }
				</div>
			</div>
		</div>); }

		return (
			<main>
				<Header title="Location Details" buttonHandler={closeLocation} backButton />

				<div className="modal-tab">
					<OwlCarousel slideSpeed={300} itemsCustom={[[0,2], [375, 2]]} navigation={false} singleItem={false} autoPlay={false} >
						<div onClick={this.switchSexTab} className={this.state.sex ? 'active' : null}>Sex Offenders</div>
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
	selected: PropTypes.string.isRequired
};

export default LocationModal;
