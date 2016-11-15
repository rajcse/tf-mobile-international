import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import constants from 'constants/pubRecConstants';
import SimpleRow from 'components/shared/SimpleRow';
import Sticky from 'react-stickynode';

const SocialSecurity = (props) => {
	let { ssn } = props;
	return (
		<section id="ssn" className="widget premium">
			<Sticky>
				<h2 className="title">Social Security Information</h2>
			</Sticky>

			<div className="document ssn-individual">
				{ ssn.valid ?
					<SimpleRow
						key={`ssninfo-${uuid.v4()}`}
						content={ssn.valid}
						title="SSN Valid"
					/> : null
				}
				{ ssn.issued_location ?
					<SimpleRow
						key={`ssninfolcoation-${uuid.v4()}`}
						content={ssn.issued_location}
						title="Issued Location"
					/> : null
				}
				{ ssn.issued_years ?
					<SimpleRow
						key={`ssninfoyears-${uuid.v4()}`}
						content={ssn.issued_years}
						title="Issued Years"
					/> : null
				}
				{ _.get(ssn, 'issued_start_date.date.month') ?
					<SimpleRow
						key={`issued_start_date-${uuid.v4()}`}
						content={constants.months[ssn.issued_start_date.date.month] + ', ' + ssn.issued_start_date.date.day + ' ' + ssn.issued_start_date.date.year}
						title="Issued Start Date"
					/> : null
				}
				{ _.get(ssn, 'issued_end_date.date.month') ?
					<SimpleRow
						key={`issued_end_date-${uuid.v4()}`}
						content={constants.months[ssn.issued_end_date.date.month] + ', ' + ssn.issued_end_date.date.day + ' ' + ssn.issued_end_date.date.year}
						title="Issued End Date"
					/> : null
				}

			</div>
		</section>
	);
};

SocialSecurity.propTypes = {
	ssn: React.PropTypes.object.isRequired
};

export default SocialSecurity;
