import React from 'react';
import SimpleRow from '../shared/SimpleRow';
import SimpleInline from '../shared/SimpleInline';
import moment from 'moment';
import uuid from 'uuid';

const HuntingFishingLicenses = (props) => {

	let { huntingFishingLicenses } = props;

	return (
		<div className="hunting-fishing-container license-group">
			<div className="label label-full">
				<h3 className="subsection-title premium">Possible Hunting/Fishing Licenses</h3>
			</div>
			{ huntingFishingLicenses.map((huntingFishingLicense, i) => (
				<div className="document license-individual" key={i}>

					{ huntingFishingLicense.license_number || huntingFishingLicense.license_type ?
						<SimpleInline
							key={uuid.v4()}
							title={['License Type', 'License Number']}
							contents={[
								huntingFishingLicense.license_type,
								huntingFishingLicense.license_number || null
							]}
							classes="inline-half"
						/> : null
					}

					{ huntingFishingLicense.name ?
						<SimpleRow
							content={huntingFishingLicense.name.first + ' ' + huntingFishingLicense.name.middle + ' ' + huntingFishingLicense.name.last}
							title="Name"
						/> : null
					}

					{ huntingFishingLicense.license_date && huntingFishingLicense.license_date.month !== 0 && huntingFishingLicense.license_date.day !== 0 ?
						<SimpleRow
							content={moment(`${huntingFishingLicense.license_date.month}/${huntingFishingLicense.license_date.day}/${huntingFishingLicense.license_date.year}`, 'MM/DD/YYYY').format('LL')}
							title="License Date"
						/> : huntingFishingLicense.license_date && huntingFishingLicense.license_date.year ?
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
};

HuntingFishingLicenses.propTypes = {
	huntingFishingLicenses: React.PropTypes.array.isRequired
};

export default HuntingFishingLicenses;
