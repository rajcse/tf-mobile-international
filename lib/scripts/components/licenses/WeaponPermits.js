import constants from '../../constants/pubRecConstants';
import React from 'react';
import SimpleRow from '../shared/SimpleRow';
import moment from 'moment';
import _ from 'lodash';

const WeaponPermits = (props) => {

	let { weaponPermits } = props;

	return (
		<div className='weapon-permits-container license-group'>
			<div className="label label-full">
				<h3 className="subsection-title premium">Weapon Permits</h3>
			</div>
			{ weaponPermits.map((weaponPermit, i) => (
				<div className='weapon-permit license-individual' key={i}>

					{ weaponPermit.permit && weaponPermit.permit.permit_number ?
						<SimpleRow
							content={weaponPermit.permit.permit_number}
							title="Permit Number"
						/> : null 
					}

					{ weaponPermit.permit && weaponPermit.permit.permit_type ?
						<SimpleRow
							content={weaponPermit.permit.permit_type}
							title="Permit Type"
						/> : null 
					}

					{ weaponPermit.permit && weaponPermit.permit.weapon_type ?
						<SimpleRow
							content={weaponPermit.permit.weapon_type}
							title="Weapon Type"
						/> : null 
					}

					{ weaponPermit.permit && weaponPermit.permit.registration_date ?
						<SimpleRow
							content={moment(`${weaponPermit.permit.registration_date.month}/${weaponPermit.permit.registration_date.day}/${weaponPermit.permit.registration_date.year}`, 'MM/DD/YYYY').format('LL')}
							title="Registration Date"
						/> : null 
					}

					{ weaponPermit.permit && weaponPermit.permit.expiration_date ?
						<SimpleRow
							content={moment(`${weaponPermit.permit.expiration_date.month}/${weaponPermit.permit.expiration_date.day}/${weaponPermit.permit.expiration_date.year}`, 'MM/DD/YYYY').format('LL')}
							title="Expiration Date"
						/> : null 
					}

					{ weaponPermit.name ?
						<SimpleRow
							content={weaponPermit.name.first + ' ' + weaponPermit.name.middle + ' ' + weaponPermit.name.last}
							title="Name"
						/> : null
					}
					{/* I'm not super thrilled about building this string like this but it's easy and it works. DS returns either the data or an empty string so its safe (for now) */}
					{ weaponPermit.address ?
						<SimpleRow
							content={weaponPermit.address.street_number + ' ' + weaponPermit.address.street_pre_direction + ' ' + weaponPermit.address.street_name + ' ' + weaponPermit.address.street_suffix + ' ' + weaponPermit.address.unit_designation + ' ' + weaponPermit.address.unit_number + ' ' + weaponPermit.address.city + ' ' + weaponPermit.address.state + ' ' + weaponPermit.address.zip5}
							title="Name"
						/> : null
					}

					{ weaponPermit.occupation ?
						<SimpleRow
							content={weaponPermit.occupation}
							title="Occupation"
						/> : null
					}

					{ weaponPermit.state_name ?
						<SimpleRow
							content={weaponPermit.state_name}
							title="State Issued In"
						/> : null
					}

				</div>
			)) }
		</div>
	);
}

WeaponPermits.propTypes = {
	weaponPermits: React.PropTypes.array.isRequired,
}

export default WeaponPermits;
