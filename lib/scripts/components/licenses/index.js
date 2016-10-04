import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Sticky from 'react-stickynode';

// Container Specific Component
import LicenseColumn from './license';
import DeaLicenseColumn from './dea';
import WeaponPermits from './WeaponPermits';
import FAALicenses from './FAALicenses';
import HuntingFishingLicenses from './HuntingFishingLicenses';

import DefaultColumn from '../shared/DefaultColumn';

import uuid from 'uuid';

const LicensesSection = (props) => {
	let content = [];

	let {
		name,
		huntingFishingLicenses,
		weaponPermits,
		professionalLicenses,
		faaLicenses,
		controlledSubstances
	} = props;

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
	if (!_.isNull(professionalLicenses) && !_.isEmpty(professionalLicenses)) {
		content.push(
			<LicenseColumn
				key={'professionalLicenses-' + uuid.v4()}
				licenses={professionalLicenses}
				label="Professional License"
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
			<DeaLicenseColumn
				key={'controlledSubstances-' + uuid.v4()}
				licenses={controlledSubstances}
				label="DEA Controlled Substance License"
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
			{ content.length ?
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

LicensesSection.propTypes = {
	name: React.PropTypes.string.isRequired,
	huntingFishingLicenses: React.PropTypes.array,
	weaponPermits: React.PropTypes.array,
	professionalLicenses: React.PropTypes.array,
	faaLicenses: React.PropTypes.array,
	controlledSubstances: React.PropTypes.array
};

export default LicensesSection;
