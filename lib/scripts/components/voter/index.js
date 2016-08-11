import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';

const VoterRegistrations = (props) => {
	let { registrations, name } = props;

	return (
			<div className='multi-container'>
				<section id='registrations' className='widget multi-widget'>
					<h2 className='title'>Possible Voter Registrations</h2>
					{ registrations.map((registration, index) => (
					<div className='license widget' key={index}>
					<h3 className='title'>{registration.name.first + ' ' + registration.name.last}</h3>
					{ _.has(registration, 'political_party') ?
						<SimpleRow
							key={`political_party-${uuid.v1()}`}
							content={registration.political_party}
							title="Political Party"
						/> : null
					}
					{ _.has(registration, 'voter_record_id') ?
						<SimpleRow
							key={`voter_record_id-${uuid.v1()}`}
							content={registration.voter_record_id}
							title="Voter Record ID"
						/> : null
					}
					{ _.has(registration, 'registration_date') ?
						<SimpleRow
							key={`registration_date-${uuid.v1()}`}
							content={constants.months[registration.registration_date.month] + ', ' + registration.registration_date.day + ' ' + registration.registration_date.year}
							title="Registration Date"
						/> : null
					}
					{ _.has(registration, 'dob') ?
						<SimpleRow
							key={`registration_dob-${uuid.v1()}`}
							content={constants.months[registration.dob.month] + ', ' + registration.dob.day + ' ' + registration.dob.year}
							title="Registration DOB"
						/> : null
					}
					{ _.has(registration, 'resident_address.street_number') ?
						<SimpleRow
							key={`address-${uuid.v1()}`}
							content={registration.resident_address.street_number + ' ' + 
								registration.resident_address.street_name + ' ' + 
								registration.resident_address.street_suffix + ', ' +
								registration.resident_address.state + ', ' +
								registration.resident_address.zip5 }
							title="Registered Address"
						/> : null
					}
					{ _.has(registration, 'active_or_inactive') ?
						<SimpleRow
							key={`active-${uuid.v1()}`}
							content={registration.active_or_inactive}
							title="Active or Inactive"
						/> : null
					}

					
				</div>
			)) }
			</section>
		</div>
	);
}

VoterRegistrations.propTypes = {
	registrations: React.PropTypes.array.isRequired
}

export default VoterRegistrations;