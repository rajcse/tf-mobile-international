import React, { Component } from 'react';
import _ from 'lodash';

// Container Specific Component
import LicenseColumn from './license';
import DeaLicenseColumn from './dea';

import uuid from 'uuid';

const LicensesSectionView = (props) => {
	let content = [];

	let { hunting_fishing_licenses, weapon_permits, professional_licenses, faa_licenses, controlled_substances} = props;

	if (!_.isEmpty(hunting_fishing_licenses)) {
		content.push(
			<LicenseColumn
				key={'hunting_fishing_licenses-' + uuid.v1()}
				licenses={hunting_fishing_licenses}
				label='Hunting Fishing Licenses'
			/>
		);
	}
	if (!_.isEmpty(weapon_permits)) {
		content.push(
			<LicenseColumn
				key={'weapon_permits-' + uuid.v1()}
				licenses={weapon_permits}
				label='Weapon Permits'
			/>
		);
	}
	if (!_.isEmpty(professional_licenses)) {
		content.push(
			<LicenseColumn
				key={'professional_licenses-' + uuid.v1()}
				licenses={professional_licenses}
				label='Professional Licenses'
			/>
		);
	}
	if (!_.isEmpty(faa_licenses)) {
		content.push(
			<LicenseColumn
				key={'faa_licenses-' + uuid.v1()}
				licenses={faa_licenses}
				label='FAA Licenses'
			/>
		);
	}
	if (!_.isEmpty(controlled_substances)) {
		content.push(
			<DeaLicenseColumn
				key={'controlled_substances-' + uuid.v1()}
				licenses={controlled_substances}
				label='Controlled Substances'
			/>
		);
	}

	return(
		<section id='contact' className='widget'>
			<h2 className='title'>Licenses</h2> 
			{content}
		</section>
	);
}

export default LicensesSectionView;
