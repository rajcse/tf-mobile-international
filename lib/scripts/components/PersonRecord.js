import React from 'react';
import _ from 'lodash';
import Header from './Shared/Header';

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
import Accidents from './accidents';

const PersonRecord = (props) => {

	let	isPremium = props.record.data.isPremium;
	
	return (
		<main>
			<Header title={props.record.reportData.names[0].first} backButton />
			
			<PersonalSection
				nameTitle='Name'
				aliasTitle='Aliases'
				name={props.record.reportData.names[0].display}
				gender={_.has(props.record.reportData,'gender.content') ? props.record.reportData.gender.content : null}
				aliases={props.record.reportData.names.slice(1)}
				birthdate={_.has(props.record.reportData,'dobs[0].date') ? props.record.reportData.dobs[0].date : null}
				age={_.has(props.record.reportData,'dobs[0].age') ? props.record.reportData.dobs[0].age : null}
				zodiac={_.has(props.record.reportData,'dobs[0].zodiac') ? props.record.reportData.dobs[0].zodiac : null}
				photos={props.record.reportData.images}
				jobs={props.record.reportData.jobs}
				education={props.record.reportData.educations}
				relatives={props.record.reportData.related_persons}
			/>

			{ isPremium === true ?
				<Associates
					associates={props.record.reportData.associates}
				/> : null
			}

			{ isPremium === true ?
				<Relationships
					relationships={props.record.reportData.relationships}
				/> : null
			}
			{ isPremium === true ?
				<VoterRegistrations
					registrations={props.record.reportData.voter_registrations}
				/> : null
			}

			<ContactSection
				phones={props.record.reportData.phones}
				emails={props.record.reportData.emails}
			/>

			<LocationSection
				locations={props.record.reportData.locations}
				isPremium={isPremium}
			/>

			{ !_.isEmpty(props.record.reportData.criminal_records) ?
				<CriminalRecordsSection
					crimes={props.record.reportData.criminal_records}
				/> : null
			}

			{ !_.isEmpty(props.record.reportData.sources) ?
				<SocialSection
					accounts={props.record.reportData.sources}
					links={props.record.reportData.urls}
				/> : null
			}

			<LicensesSection
				name={props.record.reportData.names[0].display}
				faa_licenses={props.record.reportData.faa_licenses}
				controlled_substances={props.record.reportData.controlled_substances}
				hunting_fishing_licenses={props.record.reportData.hunting_fishing_licenses}
				professional_licenses={props.record.reportData.professional_licenses}
				weapon_permits={props.record.reportData.weapon_permits}
			/>

			{/*               Premium Sections           */}
			{ isPremium === true ?
				<Accidents
					accidents={props.record.reportData.accidents}
				/> : null
			}
			{ isPremium === true ?
				<Businesses
					businesses={props.record.reportData.corporate_affiliations}
				/> : null
			}
			{ isPremium === true ?
				<Assets
					assets={props.record.reportData.properties}
				/> : null
			}
			{ isPremium === true ?
				<Watercrafts
					watercrafts={props.record.reportData.watercrafts}
				/> : null
			}
		</main>
	);
}

export default PersonRecord;



