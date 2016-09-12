import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';
import Sticky from 'react-stickynode';

const Imposters = (props) => {
	let { imposters } = props;

	return (
		<div className="multi-container">
			<section id="imposters" className="widget multi-widget premium">
				<Sticky>
					<h2 className="title">Imposters</h2>
				</Sticky>				
				{ imposters[0].akas.map((imposter, index) => (
					<div className="license widget" key={index}>
						<h3 className="title">{imposter.name.first + ' ' + imposter.name.last}</h3>
						{ _.has(imposter, 'ssn_info.valid') ?
							<SimpleRow
								key={`ssninfo-${uuid.v4()}`}
								content={imposter.ssn_info.valid}
								title="SSN Valid"
							/> : null
						}
						{ _.has(imposter, 'ssn_info.issued_location') ?
							<SimpleRow
								key={`ssninfolcoation-${uuid.v4()}`}
								content={imposter.ssn_info.issued_location}
								title="Issued Location"
							/> : null
						}
						{ _.has(imposter, 'ssn_info.issued_start_date.month') ?
							<SimpleRow
								key={`issued_start_date-${uuid.v4()}`}
								content={constants.months[imposter.ssn_info.issued_start_date.month] + ', ' + imposter.ssn_info.issued_start_date.day + ' ' + imposter.ssn_info.issued_start_date.year}
								title="Issued Start Date"
							/> : null
						}
						{ _.has(imposter, 'ssn_info.issued_end_date.month') ?
							<SimpleRow
								key={`issued_end_date-${uuid.v4()}`}
								content={constants.months[imposter.ssn_info.issued_end_date.month] + ', ' + imposter.ssn_info.issued_end_date.day + ' ' + imposter.ssn_info.issued_end_date.year}
								title="Issued End Date"
							/> : null
						}
						{ _.has(imposter, 'dob') ?
							<SimpleRow
								key={`imposter_dob-${uuid.v4()}`}
								content={constants.months[imposter.dob.month] + ', ' + imposter.dob.day + ' ' + imposter.dob.year}
								title="imposter DOB"
							/> : null
						}

					</div>
				)) }
			</section>
		</div>
	);
};

Imposters.propTypes = {
	imposters: React.PropTypes.array.isRequired
};

export default Imposters;
