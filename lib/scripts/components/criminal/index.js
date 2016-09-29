import React, { Component, PropTypes } from 'react';
import Sticky from 'react-stickynode';
import CriminalRecordsList from './list';
import DefaultColumn from '../shared/DefaultColumn';

import uuid from 'uuid';

class CriminalRecordsSection extends Component {
	render() {
		let { name, likelyCrimes, possibleCrimes, unlikelyCrimes, openCrime } = this.props;

		// Fallback Details
		let fallback = {
			title: `Our extensive public records search did not uncover arrest or criminal records ${name}.`,
			content: `We scanned for ${name}'s name among hundreds of millions of records from local, state, and federal databases in all 50 states.`,
		};

		return (
			<section id="criminal" className="widget">
				<Sticky>
					<h2 className="title">Criminal Records</h2>
				</Sticky>

				{ likelyCrimes.length > 0 || possibleCrimes.length > 0 || unlikelyCrimes.length > 0?
					<CriminalRecordsList
						key={`records-${uuid.v4()}`}
						likelyCrimes={likelyCrimes}
						possibleCrimes={possibleCrimes}
						unlikelyCrimes={unlikelyCrimes}
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

CriminalRecordsSection.propTypes = {
	likelyCrimes: PropTypes.array.isRequired,
	possibleCrimes: PropTypes.array.isRequired,
	unlikelyCrimes: PropTypes.array.isRequired,
	openCrime: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired
};

export default CriminalRecordsSection;
