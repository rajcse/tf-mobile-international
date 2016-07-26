import React, { Component } from 'react';
import _ from 'lodash';

// Container Specific Component
import LicenseColumn from './license';
import DeaLicenseColumn from './dea';

import DefaultColumn from '../Shared/DefaultColumn';

import uuid from 'uuid';

const LicensesSectionView = (props) => {
	let content = [];

	let {
		name,
		hunting_fishing_licenses,
		weapon_permits,
		professional_licenses,
		faa_licenses,
		controlled_substances
	} = props;

	if (!_.isNull(hunting_fishing_licenses) && !_.isEmpty(hunting_fishing_licenses)) {
		content.push(
			<LicenseColumn
				key={'hunting_fishing_licenses-' + uuid.v1()}
				licenses={hunting_fishing_licenses}
				label='Hunting Fishing License'
			/>
		);
	}
	if (!_.isNull(weapon_permits) && !_.isEmpty(weapon_permits)) {
		content.push(
			<LicenseColumn
				key={'weapon_permits-' + uuid.v1()}
				licenses={weapon_permits}
				label='Weapon Permit'
			/>
		);
	}
	if (!_.isNull(professional_licenses) && !_.isEmpty(professional_licenses)) {
		content.push(
			<LicenseColumn
				key={'professional_licenses-' + uuid.v1()}
				licenses={professional_licenses}
				label='Professional License'
			/>
		);
	}

	if (!_.isNull(faa_licenses) && !_.isEmpty(faa_licenses)) {
		content.push(
			<LicenseColumn
				key={'faa_licenses-' + uuid.v1()}
				licenses={faa_licenses}
				label='FAA License'
			/>
		);
	}

	// Fallback Details
	let fallback = {
		title: `Our extensive public records search did not uncover professional licenses for ${name}.`,
		content: `There are 618,660 FAA certified pilots in the U.S. That's less than 0.2% of the population. So, if FAA license information doesn't show up here, ${name} may not have one.`,
	}

	return(
		<div className='multi-container'>
			<section id='licenses' className='widget multi-widget'>
				<h2 className='title'>Licenses</h2>
				{ _.isEmpty(content) ?
					<DefaultColumn
						name={name}
						icon='licenses'
						title={fallback.title}
						content={fallback.content}
						type='licenses'
					/> : content }
			</section>

			{ !_.isNull(controlled_substances) && !_.isEmpty(controlled_substances) ?
				<section id='substances' className='widget'>
					<h2 className='title'>Controlled Substances</h2>
					<DeaLicenseColumn
						key={'controlled_substances-' + uuid.v1()}
						licenses={controlled_substances}
					/>
				</section>
			: null }
		</div>
	);
}

export default LicensesSectionView;
