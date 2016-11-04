import React from 'react';
import _ from 'lodash';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';


const ProfessionalLicenses = (props) => {
	const { professionalLicenses, professionalLicensesTu } = props;

	function formatPhone(phonenum) {
	    var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
	    if (regexObj.test(phonenum)) {
	        var parts = phonenum.match(regexObj);
	        var phone = '';
	        if (parts[1]) { phone += '(' + parts[1] + ') '; }
	        phone += parts[2] + '-' + parts[3];
	        return phone;
	    }
	    else {
	        //invalid phone number
	        return phonenum;
	    }
	}

	return (
		<div className="professional-licenses-container">
			<div className="label label-full">
				<h3 className="subsection-title premium">Possible Professional Licenses</h3>
			</div>
			{ professionalLicenses.map((professionalLicense, i) => (
				<div className="document license-individual" key={i}>
					{ professionalLicense.license_type &&
						<SimpleRow
							content={professionalLicense.license_type}
							title="License Type"
						/> }

					{ professionalLicense.profession_or_board && professionalLicense.profession_or_board !== professionalLicense.license_type ?
						<SimpleRow
							content={professionalLicense.profession_or_board}
							title="Profession or Board"
						/> : null
					}

					{ professionalLicense.name &&
						<SimpleRow
							content={`${professionalLicense.name.first} ${professionalLicense.name.middle} ${professionalLicense.name.last}`}
							title="Name"
						/> }

					{ professionalLicense.company_name &&
						<SimpleRow
							content={professionalLicense.company_name}
							title="Company Name"
						/> }

					{ professionalLicense.address &&
						<SimpleRow
							content={`${professionalLicense.address.street_number} ${professionalLicense.address.street_pre_direction} ${professionalLicense.address.street_name} ${professionalLicense.address.street_suffix} ${professionalLicense.address.unit_designation} ${professionalLicense.address.unit_number} ${professionalLicense.address.city} ${professionalLicense.address.state} ${professionalLicense.address.zip5}`}
							title="Address"
						/> }

					{ professionalLicense.phone &&
						<SimpleRow
							content={formatPhone(professionalLicense.phone)}
							title="Phone Number"
						/> }

					{ professionalLicense.practice_type &&
						<SimpleRow
							content={professionalLicense.practice_type}
							title="Practice Type"
						/> }
					
					{ professionalLicense.license_number &&
						<SimpleRow
							content={professionalLicense.license_number}
							title="License Number"
						/> }

					{ professionalLicense.status &&
						<SimpleRow
							content={professionalLicense.status}
							title="Status"
						/> }

					{ professionalLicense.source_state &&
						<SimpleRow
							content={professionalLicense.source_state}
							title="Issuing State"
						/> }

					{ _.has(professionalLicense.issued_date,'month') ?
						<SimpleRow
							content={`${constants.months[professionalLicense.issued_date.month]} ${professionalLicense.issued_date.day}, ${professionalLicense.issued_date.year}`}
							title="Issued Date"
						/> : null
					}

					{ _.has(professionalLicense.expiration_date,'month') ?
						<SimpleRow
							content={`${constants.months[professionalLicense.expiration_date.month]} ${professionalLicense.expiration_date.day}, ${professionalLicense.expiration_date.year}`}
							title="Expiration Date"
						/> : null
					}

					{ professionalLicense.education1 && professionalLicense.education1.school &&
						<SimpleRow
							content={professionalLicense.education1.school}
							title="School"
						/> }

					{ professionalLicense.education1 && professionalLicense.education1.degree &&
						<SimpleRow
							content={professionalLicense.education1.degree}
							title="Degree Obtained"
						/> }

					{ professionalLicense.education1 && professionalLicense.education1.dates_attended &&
						<SimpleRow
							content={professionalLicense.education1.dates_attended}
							title="Dates Attended"
						/> }

				</div>
			)) }
			
			{ professionalLicensesTu.map((professionalLicense, i) => (
				<div className="document license-individual" key={i}>
					{ professionalLicense.license_type &&
						<SimpleRow
							content={professionalLicense.license_type}
							title="License Type"
						/> }

					{ professionalLicense.profession_or_board && professionalLicense.profession_or_board !== professionalLicense.license_type ?
						<SimpleRow
							content={professionalLicense.profession_or_board}
							title="Profession or Board"
						/> : null
					}

					{ professionalLicense.name &&
						<SimpleRow
							content={`${professionalLicense.name.first} ${professionalLicense.name.middle} ${professionalLicense.name.last}`}
							title="Name"
						/> }

					{ professionalLicense.business_name &&
						<SimpleRow
							content={professionalLicense.business_name}
							title="Business Name"
						/> }

					{ professionalLicense.address && professionalLicense.address.address &&
						<SimpleRow
							content={professionalLicense.address.address.display}
							title="Address"
						/> }

					{ professionalLicense.phone &&
						<SimpleRow
							content={formatPhone(professionalLicense.phone)}
							title="Phone Number"
						/> }

					{ professionalLicense.specialties && professionalLicense.specialties.length &&
						<SimpleRow
							content={professionalLicense.specialties[0]}
							title="Specialties"
						/> }
						
					{ professionalLicense.trade_type &&
						<SimpleRow
							content={professionalLicense.trade_type}
							title="Trade Type"
						/> }
					
					{ professionalLicense.license_number &&
						<SimpleRow
							content={professionalLicense.license_number}
							title="License Number"
						/> }

					{ professionalLicense.license_status &&
						<SimpleRow
							content={professionalLicense.license_status}
							title="Status"
						/> }

					{ professionalLicense.license_state &&
						<SimpleRow
							content={professionalLicense.license_state}
							title="Issuing State"
						/> }

					{ _.has(professionalLicense.issue_date, 'month') &&
						<SimpleRow
							content={`${constants.months[professionalLicense.issue_date.month]} ${professionalLicense.issue_date.day}, ${professionalLicense.issue_date.year}`}
							title="Issued Date"
						/> }

					{ _.has(professionalLicense.expiration_date, 'month') &&
						<SimpleRow
							content={`${constants.months[professionalLicense.expiration_date.month]} ${professionalLicense.expiration_date.day}, ${professionalLicense.expiration_date.year}`}
							title="Expiration Date"
						/> }
				</div>
			)) }
		</div>
	);
};

ProfessionalLicenses.propTypes = {
	professionalLicenses: React.PropTypes.array.isRequired,
	professionalLicensesTu: React.PropTypes.array.isRequired
};

export default ProfessionalLicenses;
