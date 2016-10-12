import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';
import Sticky from 'react-stickynode';

const VoterRegistrations = (props) => {
	let { registrations } = props;

	return (
		<section id="voter-registrations" className="widget premium">
			<Sticky>
				<h2 className="title">Possible Voter Reg.</h2>
			</Sticky>

			{ registrations.map((registration, index) => (
				<div className="document registration-individual" key={index}>
					{ registration.political_party ?
						<SimpleRow
							key={`political_party-${uuid.v4()}`}
							content={registration.political_party}
							title="Political Party"
						/> : null
					}

					{ registration.name ?
						<SimpleRow
							key={`political_party-${uuid.v4()}`}
							content={registration.name.first + ' ' + registration.name.last}
							title="Registered Name"
						/> : null
					}

					{ registration.voter_record_id ?
						<SimpleRow
							key={`voter_record_id-${uuid.v4()}`}
							content={registration.voter_record_id}
							title="Voter Record ID"
						/> : null
					}

					{ registration.registrate_state_name ?
						<SimpleRow
							key={`voter_record_id-${uuid.v4()}`}
							content={registration.registrate_state_name}
							title="State Registered"
						/> : null
					}

					{ registration.registration_date && registration.registration_date.month ?
						<SimpleRow
							key={`registration_date-${uuid.v4()}`}
							content={constants.months[registration.registration_date.month] + ' ' + registration.registration_date.day + ' ' + registration.registration_date.year}
							title="Registration Date"
						/> : null
					}

					{ registration.resident_address ?
						<SimpleRow
							key={`address-${uuid.v4()}`}
							content={registration.resident_address.street_number + ' ' +
								registration.resident_address.street_name + ' ' +
								registration.resident_address.street_suffix + ' ' +
								registration.resident_address.state + ' ' +
							registration.resident_address.zip5 }
							title="Registered Address"
						/> : null
					}
					{ registration.active_or_inactive ?
						<SimpleRow
							key={`active-${uuid.v4()}`}
							content={registration.active_or_inactive}
							title="Active or Inactive"
						/> : null
					}
					{ registration.last_vote_date && registration.last_vote_date.month ?
						<SimpleRow
							key={`registration_date-${uuid.v4()}`}
							content={constants.months[registration.last_vote_date.month] + ' ' + registration.last_vote_date.year}
							title="Last Vote Date"
						/> : null
					}
				</div>
			)) }
		</section>
	);
};

VoterRegistrations.propTypes = {
	registrations: React.PropTypes.array.isRequired
};

export default VoterRegistrations;
