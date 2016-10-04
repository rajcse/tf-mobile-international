import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Sticky from 'react-stickynode';

// Container Specific Component
import DeaLicenses from './DeaLicenses';
import WeaponPermits from './WeaponPermits';
import FAALicenses from './FAALicenses';
import HuntingFishingLicenses from './HuntingFishingLicenses';
import ProfessionalLicenses from './ProfessionalLicenses';

import DefaultColumn from '../shared/DefaultColumn';

import uuid from 'uuid';

const Licenses = (props) => {
	let content = [];

	let {
		name,
		huntingFishingLicenses,
		weaponPermits,
		professionalLicenses,
		faaLicenses,
		controlledSubstances
	} = props;
	console.log(professionalLicenses);
	if (huntingFishingLicenses && huntingFishingLicenses.length) {
		content.push(
			<HuntingFishingLicenses
				key={'huntingFishingLicenses-' + uuid.v4()}
				huntingFishingLicenses={huntingFishingLicenses}
			/>
		);
	}
	if (weaponPermits && weaponPermits.length) {
		content.push(
			<WeaponPermits
				key={'weaponPermits-' + uuid.v4()}
				weaponPermits={weaponPermits}
			/>
		);
	}
	if (professionalLicenses && professionalLicenses.length) {
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

	// Fallback Details
	let fallback = {
		title: `Our extensive public records search did not uncover professional licenses for ${name}.`,
		content: `There are 618,660 FAA certified pilots in the U.S. That's less than 0.2% of the population. So, if FAA license information doesn't show up here, ${name} may not have one.`,
	};

	return(
		<section id="licenses" className={classNames('widget')}>
			<Sticky>
				<h2 className="title">Licenses</h2>
			</Sticky>
			{ !content.length ?
				<DefaultColumn
					name={name}
					icon="licenses"
					title={fallback.title}
					content={fallback.content}
					type="licenses"
				/> : content }
		</section>
	);
};

Licenses.propTypes = {
	name: React.PropTypes.string.isRequired,
	huntingFishingLicenses: React.PropTypes.array,
	weaponPermits: React.PropTypes.array,
	professionalLicenses: React.PropTypes.array,
	faaLicenses: React.PropTypes.array,
	controlledSubstances: React.PropTypes.array
};

export default Licenses;
