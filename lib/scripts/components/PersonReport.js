import React, { Component } from 'react';
import _ from 'lodash';

import CriminalRecordsSectionView from './Criminal';
import PersonalSectionView from './Personal';
import ContactSectionView from './Contact';
import LocationSectionView from './Location';
import SocialSectionView from './Social';
// import SexOffenderSectionView from './Offender';
import LicensesSectionView from './Licenses';
import BusinessesSectionView from './Businesses';
import AssetsSectionView from './Assets';

const PersonReport = (props) => {

	let	isPremium = props.person.reportMeta.isPremium;

	return (
		<main>
			<h1>Person Report</h1>
			<PersonalSectionView
				nameTitle='Name'
				aliasTitle='Aliases'
				name={props.person.names[0].display}
				gender={_.has(props.person,'gender.content') ? props.person.gender.content : null}
				aliases={props.person.names.slice(1)}
				birthdate={_.has(props.person,'dobs[0].date') ? props.person.dobs[0].date : null}
				age={_.has(props.person,'dobs[0].age') ? props.person.dobs[0].age : null}
				zodiac={_.has(props.person,'dobs[0].zodiac') ? props.person.dobs[0].zodiac : null}
				photos={props.person.images}
				jobs={props.person.jobs}
				education={props.person.educations}
				relatives={props.person.related_persons}
			/>



			<ContactSectionView
				phones={props.person.phones}
				emails={props.person.emails}
			/>

			<LocationSectionView
				locations={props.person.locations}
			/>

			{ !_.isEmpty(props.person.criminal_records) ?
				<CriminalRecordsSectionView
					crimes={props.person.criminal_records}
				/> : null
			}

			{ !_.isEmpty(props.person.sources) ?
				<SocialSectionView
					accounts={props.person.sources}
					links={props.person.urls}
				/> : null
			}

			<LicensesSectionView
				name={props.person.names[0].display}
				faa_licenses={props.person.faa_licenses}
				controlled_substances={props.person.controlled_substances}
				hunting_fishing_licenses={props.person.hunting_fishing_licenses}
				professional_licenses={props.person.professional_licenses}
				weapon_permits={props.person.weapon_permits}
			/>

			{/*               Premium Sections           */}
			{ isPremium === true ?
				<BusinessesSectionView
					businesses={props.person.corporate_affiliations}
				/> : null
			}

			{ isPremium === true ?
				<AssetsSectionView
					assets={props.person.properties}
				/> : null
			}
		</main>
	);
}

export default PersonReport;
