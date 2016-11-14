import constants from '../../constants/pubRecConstants';
import React from 'react';
import Svg from '../Svg';
import SimpleRow from '../shared/SimpleRow';
import _ from 'lodash';

const DeaLicenses = (props) => {
	return (
		<div className="dea-container">
			<div className="label label-full">
				<h3 className="subsection-title"><Svg svg="premiumIconSmall" style={{width: 10}} className="title-icon" /> Possible DEA Controlled Substance Licenses</h3>
			</div>
			{ props.deaLicenses.map((deaLicense, i) => (
				<div className="document license-individual" key={i}>
					{ deaLicense.registration_number ?
						<SimpleRow
							content={deaLicense.registration_number}
							title="Registration Number"
						/> : null
					}

					{ deaLicense.name && deaLicense.name.display ?
						<SimpleRow
							content={deaLicense.name.display}
							title="Name"
						/> : null
					}

					{ deaLicense.address && deaLicense.address.display ?
						<SimpleRow
							content={deaLicense.address.display}
							title="Address"
						/> : null
					}

					{ deaLicense.company_name ?
						<SimpleRow
							content={deaLicense.company_name}
							title="Company Name"
						/> : null
					}

					{ deaLicense.drug_schedules ?
						<SimpleRow
							content={deaLicense.drug_schedules}
							title="Drug Schedules"
						/> : null
					}

					{ deaLicense.business_type ?
						<SimpleRow
							content={deaLicense.business_type}
							title="Business Type"
						/> : null
					}

					{ _.has(deaLicense.expiration_date,'month') ?
						<SimpleRow
							content={`${constants.months[deaLicense.expiration_date.month]},${deaLicense.expiration_date.day} ${deaLicense.expiration_date.year}`}
							title="Expiration Date"
						/> : null
					}

				</div>
			)) }
		</div>
	);
};

DeaLicenses.propTypes = {
	deaLicenses: React.PropTypes.array.isRequired
};

export default DeaLicenses;
