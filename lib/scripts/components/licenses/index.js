import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

// Container Specific Component
import LicenseColumn from './license';
import DeaLicenseColumn from './dea';

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

	if (!_.isNull(huntingFishingLicenses) && !_.isEmpty(huntingFishingLicenses)) {
		content.push(
			<LicenseColumn
				key={'huntingFishingLicenses-' + uuid.v4()}
				licenses={huntingFishingLicenses}
				label="Hunting Fishing License"
			/>
		);
	}
	if (!_.isNull(weaponPermits) && !_.isEmpty(weaponPermits)) {
		content.push(
			<LicenseColumn
				key={'weaponPermits-' + uuid.v4()}
				licenses={weaponPermits}
				label="Weapon Permit"
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

	if (!_.isNull(faaLicenses) && !_.isEmpty(faaLicenses)) {
		content.push(
			<LicenseColumn
				key={'faaLicenses-' + uuid.v4()}
				licenses={faaLicenses}
				label="FAA License"
			/>
		);
	}

	// Fallback Details
	let fallback = {
		title: `Our extensive public records search did not uncover professional licenses for ${name}.`,
		content: `There are 618,660 FAA certified pilots in the U.S. That's less than 0.2% of the population. So, if FAA license information doesn't show up here, ${name} may not have one.`,
	};

	let classes = '';

	if(_.isEmpty(content)) {
		classes = '';
	} else {
		classes = 'multi-widget';
	}

	return(
		<div className="multi-container">
			<section id="licenses" className={classNames('widget', classes)}>
				<h2 className="title">Licenses</h2>
				{ _.isEmpty(content) ?
					<DefaultColumn
						name={name}
						icon="licenses"
						title={fallback.title}
						content={fallback.content}
						type="licenses"
					/> : content }
			</section>

			{ !_.isNull(controlledSubstances) && !_.isEmpty(controlledSubstances) ?
				<section id="substances" className="widget premium">
					<h2 className="title">Controlled Substances</h2>
					<DeaLicenseColumn
						key={'controlledSubstances-' + uuid.v4()}
						licenses={controlledSubstances}
					/>
				</section>
			: null }
		</div>
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
