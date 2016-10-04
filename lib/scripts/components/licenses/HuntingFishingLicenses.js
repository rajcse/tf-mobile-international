import constants from '../../constants/pubRecConstants';
import React from 'react';
import SimpleRow from '../shared/SimpleRow';
import moment from 'moment';
import _ from 'lodash';

const HuntingFishingLicenses = (props) => {

	let { huntingFishingLicenses } = props;

	return (
		<div className='hunting-fishing-container license-group'>
			<div className="label label-full">
				<h3 className="subsection-title premium">Hunting/Fishing Licenses</h3>
			</div>
			{ huntingFishingLicenses.map((huntingFishingLicense, i) => (
				<div className='hunting-fishing license-individual' key={i}>

					{ huntingFishingLicense.license_number ?
						<SimpleRow
							content={huntingFishingLicense.license_number}
							title="License Number"
						/> : null 
					}

					{ huntingFishingLicense.license_type ?
						<SimpleRow
							content={huntingFishingLicense.license_type}
							title="License Type"
						/> : null 
					}

					{ huntingFishingLicense.name ?
						<SimpleRow
							content={huntingFishingLicense.name.first + ' ' + huntingFishingLicense.name.middle + ' ' + huntingFishingLicense.name.last}
							title="Name"
						/> : null
					}

					{ huntingFishingLicense.license_date && huntingFishingLicense.license_date.month !== 0 && huntingFishingLicense.license_date.day !== 0? 
						<SimpleRow
							content={moment(`${huntingFishingLicense.license_date.month}/${huntingFishingLicense.license_date.day}/${huntingFishingLicense.license_date.year}`, 'MM/DD/YYYY').format('LL')}
							title="License Date"
						/> : huntingFishingLicense.license_date.year ?
							<SimpleRow
								content={huntingFishingLicense.license_date.year}
								title="License Date"
							/> : null
					}

					{ huntingFishingLicense.license_state ?
						<SimpleRow
							content={huntingFishingLicense.license_state}
							title="Issuing State"
						/> : null 
					}

					{ huntingFishingLicense.occupation ?
						<SimpleRow
							content={huntingFishingLicense.occupation}
							title="Licensee Occupation"
						/> : null
					}

				</div>
			)) }
		</div>
	);
}

HuntingFishingLicenses.propTypes = {
	huntingFishingLicenses: React.PropTypes.array.isRequired,
}

export default HuntingFishingLicenses;
