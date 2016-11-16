import React, { Component, PropTypes } from 'react';
import Sticky from 'react-stickynode';
import CriminalRecordsList from './CriminalRecordsList';
import DefaultColumn from 'components/DefaultColumn';

import uuid from 'uuid';

class CriminalRecords extends Component {
	render() {
		let { name, filteredCrimes, openCrime } = this.props;

		// Fallback Details
		let fallback = {
			title: `Our extensive public records search did not uncover arrest or criminal records ${name}.`,
			content: `We scanned for ${name}'s name among hundreds of millions of records from local, state, and federal databases in all 50 states.`
		};
		return (
			<section id="criminal" className="widget">
				<Sticky>
					<h2 className="title">Possible Criminal Records</h2>
				</Sticky>

				{ filteredCrimes.length > 0 ?
					<CriminalRecordsList
						key={`records-${uuid.v4()}`}
						filteredCrimes={filteredCrimes}
						openCrime={openCrime}
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
	name: PropTypes.string.isRequired
};

export default CriminalRecords;
