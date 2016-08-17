import React, { Component } from 'react';
import CriminalRecordsList from './list';

import _ from 'lodash';
import uuid from 'uuid';

class CriminalRecordsSection extends Component {
	render() {
		let { crimes } = this.props;

		let bestMatch 	= [],
				likely		= [],
				leastLikely = [];

		for(var record in crimes){
			if (crimes[record].matching_fields.dob) {
				bestMatch.push( crimes[record] );
			} else if (crimes[record].matching_fields.state) {
				likely.push( crimes[record] );
			} else {
				leastLikely.push( crimes[record] );
			}
		}

		return (
			<section id='criminal' className='widget'>
				<h2 className='title'>Criminal Records</h2>

				{/*Most Likely Criminal Records*/}
				{ !_.isEmpty(bestMatch) ?
					<CriminalRecordsList
						key={`records-${uuid.v1()}`}
						classes='best-match'
						records={bestMatch}
						type='bestMatch'
						title='Best Match'
					/>
				: null }

				{/*Likely Criminal Records*/}
				{/* { !_.isEmpty(likely) ?
					<CriminalRecordsList
					key={`records-${uuid.v1()}`}
					classes='likely'
					records={likely}
					type='likely'
					title='Likely'
					/>
				: null } */}

				{/*Least Likely Criminal Records*/}
				{/* { !_.isEmpty(leastLikely) ?
					<CriminalRecordsList
					key={`records-${uuid.v1()}`}
					classes='least-likely'
					records={leastLikely}
					type='leastLikely'
					title='Least Likely'
					/>
				: null } */}
			</section>
		);
	}
}

export default CriminalRecordsSection;
