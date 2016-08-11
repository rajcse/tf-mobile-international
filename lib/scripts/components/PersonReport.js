import React, { Component } from 'react';
import _ from 'lodash';

import CriminalRecordsSection from './criminal';
import PersonalSection from './personal';
import ContactSection from './contact';
import LocationSection from './location';
import SocialSection from './social';
// import SexOffenderSectionView from './Offender';
import LicensesSection from './licenses';
import Businesses from './businesses';
import Assets from './assets';
import Watercrafts from './watercrafts';
import Associates from './associates';
import Relationships from './relationships';
import VoterRegistrations from './voter';

const PersonReport = (props) => {

	let	isPremium = props.person.reportMeta.isPremium;

	return (
		<main>
			<h1>Person Report</h1>
			<PersonalSection
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

			{ isPremium === true ?
				<Associates
					associates={props.person.associates}
				/> : null
			}

			{ isPremium === true ?
				<Relationships
					relationships={props.person.relationships}
				/> : null
			}
			{ isPremium === true ?
				<VoterRegistrations
					registrations={props.person.voter_registrations}
				/> : null
			}

			<ContactSection
				phones={props.person.phones}
				emails={props.person.emails}
			/>

			<LocationSection
				locations={props.person.locations}
				isPremium={isPremium}
			/>

			{ !_.isEmpty(props.person.criminal_records) ?
				<CriminalRecordsSection
					crimes={props.person.criminal_records}
				/> : null
			}

			{ !_.isEmpty(props.person.sources) ?
				<SocialSection
					accounts={props.person.sources}
					links={props.person.urls}
				/> : null
			}

			<LicensesSection
				name={props.person.names[0].display}
				faa_licenses={props.person.faa_licenses}
				controlled_substances={props.person.controlled_substances}
				hunting_fishing_licenses={props.person.hunting_fishing_licenses}
				professional_licenses={props.person.professional_licenses}
				weapon_permits={props.person.weapon_permits}
			/>

			{/*               Premium Sections           */}
			{ isPremium === true ?
				<Businesses
					businesses={props.person.corporate_affiliations}
				/> : null
			}
			{ isPremium === true ?
				<Assets
					assets={props.person.properties}
				/> : null
			}
			{ isPremium === true ?
				<Watercrafts
					watercrafts={props.person.watercrafts}
				/> : null
			}
		</main>
	);
}

export default PersonReport;



