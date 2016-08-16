import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';

const Imposters = (props) => {
	let { imposters, name } = props;

	return (
			<div className='multi-container'>
				<section id='imposters' className='widget multi-widget'>
					<h2 className='title'>Imposters</h2>
					{ imposters.map((imposter, index) => (
					<div className='license widget' key={index}>
					<h3 className='title'>{imposter.company_name}</h3>
					<SimpleRow
						key={`name-${uuid.v1()}`}
						content={imposter.name.first + ' ' + imposter.name.last}
						title="Name"
					/>
					{ _.has(imposter, 'corporation_number') ?
						<SimpleRow
							key={`record-date-${uuid.v1()}`}
							content={imposter.corporation_number}
							title="Corporation Number"
						/> : null
					}
					<SimpleRow
						key={`title-${uuid.v1()}`}
						content={imposter.title}
						title="Title"
					/>
					<SimpleRow
						key={`status-${uuid.v1()}`}
						content={imposter.status_description}
						title="Status"
					/>
					{ _.has(imposter, 'record_date') ?
						<SimpleRow
							key={`record-date-${uuid.v1()}`}
							content={constants.months[imposter.record_date.month] + ', ' + imposter.record_date.day + ' ' + imposter.record_date.year}
							title="Record Date"
						/> : null
					}
					{ _.has(imposter, 'filing_date.month') ?
						<SimpleRow
							key={`record-date-${uuid.v1()}`}
							content={constants.months[imposter.filing_date.month] + ', ' + imposter.filing_date.day + ' ' + imposter.filing_date.year}
							title="Filing Date"
						/> : null
					}
					{ _.has(imposter, 'state') ?
						<SimpleRow
							key={`address-${uuid.v1()}`}
							content={imposter.state}
							title="State"
						/> : null
					}
					
				</div>
			)) }
			</section>
		</div>
	);
}

Imposters.propTypes = {
	businesses: React.PropTypes.array.isRequired
}

export default Imposters;