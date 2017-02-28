import React, { Component, PropTypes } from 'react';
import CriminalRecordsList from './CriminalRecordsList';
import CriminalRecordsUpsell from './CriminalRecordsUpsell';
import DefaultColumn from 'components/DefaultColumn';
import Loader from 'components/Loader';
import firebaseClient from 'utils/firebaseClient';

class CriminalRecords extends Component {
	constructor(props) {
		super(props);

		this.state = {
			upsellDisplay: false
		};
	}

	componentWillMount() {
		firebaseClient.getConfigValue('criminal_upsell')
			.then(response => {
				this.setState({
					upsellDisplay: response
				});
				firebaseClient.setUserProperty('criminal_upsell', response);
			});
	}

	render() {
		let { name, filteredCrimes, openCrime, showStandardUpsell } = this.props;

		// Fallback Details
		let fallback = {
			title: `Our extensive public records search did not uncover arrest or criminal records ${name}.`,
			content: `We scanned for ${name}'s name among hundreds of millions of records from local, state, and federal databases in all 50 states.`
		};

		// Don't render anything until we have an upsell display type
		if(showStandardUpsell && filteredCrimes.length && !this.state.upsellDisplay) {
			return (
				<section id="criminal" className="widget">
					<h2 className="title">Possible Criminal Records</h2>
					<Loader />
				</section>
			);
		}

		let criminalRecordsDisplay;

		if(filteredCrimes.length) {
			if(showStandardUpsell && this.state.upsellDisplay === 'inline') {
				criminalRecordsDisplay = (<CriminalRecordsUpsell
					criminalRecordsCount={filteredCrimes.length}
					showStandardUpsell={showStandardUpsell}
				/>);
			} else {
				criminalRecordsDisplay = (<CriminalRecordsList
					filteredCrimes={filteredCrimes}
					openCrime={openCrime}
					showStandardUpsell={showStandardUpsell}
				/>);
			}
		} else {
			criminalRecordsDisplay = (<DefaultColumn
				name={name}
				icon="criminal"
				title={fallback.title}
				content={fallback.content}
				type="criminal records"
			/>);
		}

		return (
			<section id="criminal" className="widget">
				<h2 className="title">Possible Criminal Records</h2>

				{criminalRecordsDisplay}
			</section>
		);
	}
}

CriminalRecords.propTypes = {
	filteredCrimes: PropTypes.array.isRequired,
	openCrime: PropTypes.func.isRequired,
	showStandardUpsell: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.bool
	]).isRequired,
	name: PropTypes.string.isRequired
};

export default CriminalRecords;
