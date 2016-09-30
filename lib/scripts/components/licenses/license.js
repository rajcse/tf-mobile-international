import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import moment from 'moment';

import SimpleRow from '../shared/SimpleRow';

function getAddress(address) {
	let fullAddress;

	if (!_.isEmpty(address.street_address1) && address.street_address1) {
		fullAddress = address.street_address1;
	} else {
		fullAddress = `${address.street_number} ${address.street_name} ${address.street_suffix}`;
	} 

	fullAddress = `${fullAddress}, ${address.city}, ${address.state}`;

	return fullAddress;
}

const LicenseColumn = (props) => {
	let { licenses, label } = props;

	return (
		<div className="license-container">
			{ licenses.map((license, index) => (
				<div className="license widget" key={index}>
					<h3 className="title">{label} Information</h3>
					{ !license.license_number ? null :
						<SimpleRow
							key={`number-${uuid.v4()}`}
							content={license.license_number}
							title="License #"
						/>
					}

					{ !license.license_date ? null :
						license.license_date.month === 0 ?
							<SimpleRow
								key={`date-${uuid.v4()}`}
								content={license.license_date.year}
								title="Date"
							/>
						:
							<SimpleRow
								key={`date-${uuid.v4()}`}
								content={moment(`${license.license_date.month}/${license.license_date.day}/${license.license_date.year}`, 'MM/DD/YYYY').format('LL')}
								title="Date"
							/>
					}

					<SimpleRow
						key={`name-${uuid.v4()}`}
						content={`${license.name.first} ${license.name.last}`}
						title="Name"
					/>

					{ !license.sex ? null :
						<SimpleRow
							key={`sex-${uuid.v4()}`}
							content={license.sex}
							title="Gender"
						/>
					}
					{ license.address && !_.isEmpty(license.address) ?
						<SimpleRow
							key={`address-${uuid.v4()}`}
							content={getAddress(license.address)}
							title="Address"
						/>
						: null
					}

					{ !license.license_state ? null :
						<SimpleRow
							key={`state-${uuid.v4()}`}
							content={license.license_state}
							title="License State"
						/>
					}

					{ _.isEmpty(license.certificates) ? null :
						license.certificates.map((certificate, index) => (
							<div className="certificates" key={index}>
								<h4 className="title">Certificate</h4>

								{_.isEmpty(certificate.ratings) ? null :
									<SimpleRow
										key={`rating-${uuid.v4()}`}
										content={certificate.ratings}
										title="Ratings"
									/>
								}

								{_.isEmpty(certificate.level) ? null :
									<SimpleRow
										key={`level-${uuid.v4()}`}
										content={certificate.level}
										title="Level"
									/>
								}

								{_.isEmpty(certificate.type) ? null :
									<SimpleRow
										key={`type-${uuid.v4()}`}
										content={certificate.type}
										title="Type"
									/>
								}
							</div>
						)
					)}
				</div>
			)) }
		</div>
	);
};

LicenseColumn.propTypes = {
	label: React.PropTypes.string.isRequired,
	licenses: React.PropTypes.array.isRequired
};

export default LicenseColumn;
