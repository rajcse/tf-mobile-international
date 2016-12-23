import React, { Component, PropTypes } from 'react';
import CriminalRecordsList from './CriminalRecordsList';
import DefaultColumn from 'components/DefaultColumn';

import uuid from 'uuid';

class CriminalRecords extends Component {
	render() {
		let { name, filteredCrimes, openCrime, showStandardUpsell } = this.props;

		// Fallback Details
		let fallback = {
			title: `Our extensive public records search did not uncover arrest or criminal records ${name}.`,
			content: `We scanned for ${name}'s name among hundreds of millions of records from local, state, and federal databases in all 50 states.`
		};
		return (
			<section id="criminal" className="widget">
				<h2 className="title">Possible Criminal Records</h2>

				{ filteredCrimes.length > 0 ?
					<CriminalRecordsList
						key={`records-${uuid.v4()}`}
						filteredCrimes={filteredCrimes}
						openCrime={openCrime}
						showStandardUpsell={showStandardUpsell}
					/>
						: <DefaultColumn
							name={name}
							icon="criminal"
							title={fallback.title}
							content={fallback.content}
							type="criminal records"
						/>
				}
			</section>
		);
	}
}

CriminalRecords.propTypes = {
	filteredCrimes: PropTypes.array.isRequired,
	openCrime: PropTypes.func.isRequired,
	showStandardUpsell: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired
};

export default CriminalRecords;
