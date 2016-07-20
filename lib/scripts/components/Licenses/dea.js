import constants from '../../constants/pubRecConstants';
import React from 'react';
import SimpleRow from '../Shared/SimpleRow';

const DeaLicenseColumn = (props) => {
	return (
		<div className='table row'>
			<div className='widget'>
				<h4>{props.label}</h4>
			</div>

			<div className='content content-full'>
					{ props.licenses.map((license, i) =>
							<div key={i}>
								<SimpleRow content={license.name.display} title="Name" />
								<SimpleRow content={license.address.display} title="Address" />
								<SimpleRow content={license.drug_schedules} title="Drug Schedules" />
								<SimpleRow content={license.registration_number} title="Registration Number" />
								<SimpleRow content={license.business_type} title="Business Type" />
								<SimpleRow content={_.has(license.expiration_date,'month') ? constants.months[license.expiration_date.month] + ', ' + license.expiration_date.day + ' ' + license.expiration_date.year : ''} title="Expiration Date" />
							</div>
					) }
			</div>
		</div>
	);
}

DeaLicenseColumn.propTypes = {
	licenses: React.PropTypes.array.isRequired
}

export default DeaLicenseColumn;
