import constants from '../../constants/pubRecConstants';
import React from 'react';
import SimpleRow from '../shared/SimpleRow';
import _ from 'lodash';

const ProfessionalLicenses = (props) => {
	let { professionalLicenses } = props;

	function formatPhone(phonenum) {
	    var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
	    if (regexObj.test(phonenum)) {
	        var parts = phonenum.match(regexObj);
	        var phone = "";
	        if (parts[1]) { phone += "(" + parts[1] + ") "; }
	        phone += parts[2] + "-" + parts[3];
	        return phone;
	    }
	    else {
	        //invalid phone number
	        return phonenum;
	    }
	}

	return (
		<div className='professional-licenses-container'>
			<div className="label label-full">
				<h3 className="subsection-title premium">Professional Licenses</h3>
			</div>
			{ props.professionalLicenses.map((professionalLicense, i) => (
				<div className='professional-license license-individual' key={i}>
					{ professionalLicense.license_type ?
						<SimpleRow
							content={professionalLicense.license_type}
							title="License Type"
						/> : null
					}

					{ professionalLicense.name ?
						<SimpleRow
							content={`${professionalLicense.name.first} ${professionalLicense.name.middle} ${professionalLicense.name.last}`}
							title="Name"
						/> : null
					}

					{ professionalLicense.company_name ?
						<SimpleRow
							content={professionalLicense.company_name}
							title="Company Name"
						/> : null
					}

					{ professionalLicense.address ?
						<SimpleRow
							content={`${professionalLicense.address.street_number} ${professionalLicense.address.street_pre_direction} ${professionalLicense.address.street_name} ${professionalLicense.address.street_suffix} ${professionalLicense.address.unit_designation} ${professionalLicense.address.unit_number} ${professionalLicense.address.city} ${professionalLicense.address.state} ${professionalLicense.address.zip5}`}
							title="Address"
						/> : null
					}

					{ professionalLicense.phone ?
						<SimpleRow
							content={formatPhone(professionalLicense.phone)}
							title="Phone Number"
						/> : null
					}

					{ professionalLicense.practice_type ?
						<SimpleRow
							content={professionalLicense.practice_type}
							title="practice_type"
						/> : null
					}
					
					{ professionalLicense.license_number ?
						<SimpleRow
							content={professionalLicense.license_number}
							title="License Number"
						/> : null
					}

					{ professionalLicense.status ?
						<SimpleRow
							content={professionalLicense.status}
							title="Status"
						/> : null
					}

					{ professionalLicense.source_state ?
						<SimpleRow
							content={professionalLicense.source_state}
							title="Issuing State"
						/> : null
					}

					{ _.has(professionalLicense.issued_date,'month') ?
						<SimpleRow
							content= {`${constants.months[professionalLicense.issued_date.month]} ${professionalLicense.issued_date.day}, ${professionalLicense.issued_date.year}`}
							title="Issued Date"
						/> : null
					}

					{ _.has(professionalLicense.expiration_date,'month') ?
						<SimpleRow
							content= {`${constants.months[professionalLicense.expiration_date.month]} ${professionalLicense.expiration_date.day}, ${professionalLicense.expiration_date.year}`}
							title="Expiration Date"
						/> : null
					}

					{ professionalLicense.education1 && professionalLicense.education1.school ?
						<SimpleRow
							content={professionalLicense.education1.school}
							title="School"
						/> : null
					}

					{ professionalLicense.education1 && professionalLicense.education1.degree ?
						<SimpleRow
							content={professionalLicense.education1.degree}
							title="Degree Obtained"
						/> : null
					}

					{ professionalLicense.education1 && professionalLicense.education1.dates_attended ?
						<SimpleRow
							content={professionalLicense.education1.dates_attended}
							title="Dates Attended"
						/> : null
					}

				</div>
			)) }
		</div>
	);
}

ProfessionalLicenses.propTypes = {
	professionalLicenses: React.PropTypes.array.isRequired
}

export default ProfessionalLicenses;
