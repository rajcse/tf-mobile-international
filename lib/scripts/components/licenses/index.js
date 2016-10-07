import React from 'react';
import Sticky from 'react-stickynode';

// Container Specific Component
import DeaLicenses from './DeaLicenses';
import WeaponPermits from './WeaponPermits';
import FAALicenses from './FAALicenses';
import HuntingFishingLicenses from './HuntingFishingLicenses';
import ProfessionalLicenses from './ProfessionalLicenses';

import uuid from 'uuid';

const Licenses = (props) => {
	let content = [];
	let containsPremiumData = false;
	let {
		huntingFishingLicenses,
		weaponPermits,
		professionalLicenses,
		faaLicenses,
		controlledSubstances
	} = props;

	if (huntingFishingLicenses && huntingFishingLicenses.length) {
		containsPremiumData = true;
		content.push(
			<HuntingFishingLicenses
				key={'huntingFishingLicenses-' + uuid.v4()}
				huntingFishingLicenses={huntingFishingLicenses}
			/>
		);
	}
	if (weaponPermits && weaponPermits.length) {
		containsPremiumData = true;
		content.push(
			<WeaponPermits
				key={'weaponPermits-' + uuid.v4()}
				weaponPermits={weaponPermits}
			/>
		);
	}
	if (professionalLicenses && professionalLicenses.length) {
		containsPremiumData = true;
		content.push(
			<ProfessionalLicenses
				key={'professionalLicenses-' + uuid.v4()}
				professionalLicenses={professionalLicenses}
			/>
		);
	}

	if (faaLicenses && faaLicenses.length) {
		content.push(
			<FAALicenses
				key={'faaLicenses-' + uuid.v4()}
				faaLicenses={faaLicenses}
			/>
		);
	}

	if (controlledSubstances && controlledSubstances.length) {
		content.push(
			<DeaLicenses
				key={'controlledSubstances-' + uuid.v4()}
				deaLicenses={controlledSubstances}
			/>
		);
	}

	// Do not render component if it has no data
	if (content.length === 0) {
		return null;
	}

	return(
		<section id="licenses" className={containsPremiumData ? 'premium' + ' widget' : 'widget'}>
			<Sticky>
				<h2 className="title">Licenses</h2>
			</Sticky>

			{content}
		</section>
	);
};

Licenses.propTypes = {
	huntingFishingLicenses: React.PropTypes.array.isRequired,
	weaponPermits: React.PropTypes.array.isRequired,
	professionalLicenses: React.PropTypes.array.isRequired,
	faaLicenses: React.PropTypes.array.isRequired,
	controlledSubstances: React.PropTypes.array.isRequired
};

export default Licenses;
