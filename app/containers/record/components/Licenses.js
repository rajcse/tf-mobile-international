import React from 'react';
import Sticky from 'react-stickynode';

// Container Specific Component
import DEALicenses from './DEALicenses';
import WeaponPermits from './WeaponPermits';
import ConcealedWeaponPermitsTu from './ConcealedWeaponPermitsTu';
import HuntingPermitsTu from './HuntingPermitsTu';
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
		concealedWeaponPermitsTu,
        huntingPermitsTu,
		professionalLicenses,
		professionalLicensesTu,
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

	if (huntingPermitsTu && huntingPermitsTu.length) {
		containsPremiumData = true;
		content.push(
			<HuntingPermitsTu
				huntingPermitsTu={huntingPermitsTu}
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

	if (concealedWeaponPermitsTu && concealedWeaponPermitsTu.length) {
		containsPremiumData = true;
		content.push(
			<ConcealedWeaponPermitsTu
				concealedWeaponPermitsTu={concealedWeaponPermitsTu}
			/>
		);
	}

	if ((professionalLicenses && professionalLicenses.length) || (professionalLicensesTu && professionalLicensesTu.length)) {
		containsPremiumData = true;
		content.push(
			<ProfessionalLicenses
				key={'professionalLicenses-' + uuid.v4()}
				professionalLicenses={professionalLicenses}
				professionalLicensesTu={professionalLicensesTu}
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
			<DEALicenses
				key={'controlledSubstances-' + uuid.v4()}
				deaLicenses={controlledSubstances}
			/>
		);
	}

	// Do not render component if it has no data
	if (!content.length) {
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
	concealedWeaponPermitsTu: React.PropTypes.array.isRequired,
	huntingPermitsTu: React.PropTypes.array.isRequired,
	professionalLicenses: React.PropTypes.array.isRequired,
	professionalLicensesTu: React.PropTypes.array.isRequired,
	faaLicenses: React.PropTypes.array.isRequired,
	controlledSubstances: React.PropTypes.array.isRequired
};

export default Licenses;
