import constants from '../../constants/pubRecConstants';
import React from 'react';
import SimpleRow from '../shared/SimpleRow';
import _ from 'lodash';

const DeaLicenseColumn = (props) => {
	let { licenses } = props;

	return (
		<div className='dea-container'>
			{ props.licenses.map((license, i) => (
				<div className='dea' key={i}>

					<SimpleRow
						content={license.name.display}
						title="Name"
					/>

					<SimpleRow
						content={license.address.display}
						title="Address"
					/>

					<SimpleRow
						content={license.drug_schedules}
						title="Drug Schedules"
					/>

					<SimpleRow
						content={license.registration_number}
						title="Registration Number"
					/>

					<SimpleRow
						content={license.business_type}
						title="Business Type"
					/>

					{ _.has(license.expiration_date,'month') ?
						<SimpleRow
							content= {`${constants.months[license.expiration_date.month]},${license.expiration_date.day} ${license.expiration_date.year}`}
							title="Expiration Date"
						/>
					: null }
				</div>
			)) }
		</div>
	);
}

DeaLicenseColumn.propTypes = {
	licenses: React.PropTypes.array.isRequired
}

export default DeaLicenseColumn;
