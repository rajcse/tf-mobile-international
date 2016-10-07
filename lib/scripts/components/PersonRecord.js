import React, { PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { RouteTransition } from 'react-router-transition';
import Header from './shared/Header';
import ReportHeader from './shared/ReportHeader';

// Global Functions File
import * as libs from '../utils/libs';

import CriminalRecordsSection from './criminal';
import PersonalSection from './personal';
import ContactSection from './contact';
import LocationSection from './location';
import SocialSection from './social';
import Licenses from './licenses';
import Businesses from './businesses';
import Assets from './assets';
import Bankruptcies from './bankruptcies';
import Liens from './liens';
import Imposters from './imposters';
import Watercrafts from './watercrafts';
import Associates from './associates';
import Relationships from './relationships';
import VoterRegistrations from './voter';
import Accidents from './accidents';
import viewActions from '../actions/viewActions';
import StudentRecords from './shared/StudentRecords';
import SocialSecurity from './security';

const PersonRecord = (props) => {
	let { record, openLocation, openCrime } = props,
		isPremium = record.data.isPremium,
		age = null,
		deathYear = null,
		location = '';

	location = record.reportData.locations ? `${record.reportData.locations[0].address.city}, ${record.reportData.locations[0].address.state_code}` : null;

	age = libs.calculateAge(record.reportData.dobs[0], record.reportData.dods[0]);
	deathYear = age.deathday ? null : moment(age.deathday, 'MM/DD/YYYY').year();

	return (
		<main>
			<Header title={record.reportData.names[0].first} backButton />

			<RouteTransition
				component="div"
				runOnMount={true}
				pathname={props.location.pathname}
				className="transition-wrapper"
				atEnter={{ opacity: 0 }}
				atLeave={{ opacity: 0 }}
				atActive={{ opacity: 1 }}
			>
				<ReportHeader
					name={record.reportData.names[0].display}
					age={age.display}
					deathdate={deathYear}
					birthdate={age.birthday}
					location={location}
					photos={record.reportData.images}
					isPremium={isPremium}
				/>

				<PersonalSection
					nameTitle="Name"
					aliasTitle="Aliases"
					name={record.reportData.names[0].display}
					gender={_.has(record.reportData,'gender.content') ? record.reportData.gender.content : null}
					aliases={record.reportData.names.slice(1)}
					deathdate={age.deathday}
					birthdate={age.birthday}
					age={age.display}
					zodiac={_.has(record.reportData,'dobs[0].zodiac') ? record.reportData.dobs[0].zodiac : null}
					photos={record.reportData.images}
					jobs={record.reportData.jobs}
					education={record.reportData.educations}
					relatives={record.reportData.related_persons}
					calculateAge={libs.calculateAge}
					dateOfRange={age.range}
				/>

				<ContactSection
					phones={record.reportData.phones}
					emails={record.reportData.emails}
				/>

				<LocationSection
					locations={record.reportData.locations}
					openLocation={openLocation}
					isPremium={isPremium}
				/>

				<CriminalRecordsSection
					name={record.reportData.names[0].first}
					filteredCrimes={record.reportData.filteredCriminalRecords}
					openCrime={openCrime}
				/>

				{ !_.isEmpty(record.reportData.sources) ?
					<SocialSection
						name={record.reportData.names[0].first}
						accounts={record.reportData.sources}
						links={record.reportData.urls}
						usernames={record.reportData.usernames}
					/> : null
				}

				{/*               Premium Sections           */}
				{ isPremium ?
					<div>
						{ _.isEmpty(record.reportData.associates) ? null :
							<Associates
								associates={record.reportData.associates}
								calculateAge={libs.calculateAge}
							/>
						}
						{ _.isEmpty(record.reportData.possible_student_records) ? null :
							<StudentRecords
								records={record.reportData.possible_student_records}
							/>
						}
						{ _.isEmpty(record.reportData.relationships) ? null :
							<Relationships
								name={record.reportData.names[0].first}
								relationships={record.reportData.relationships}
							/>
						}
						{ _.isEmpty(record.reportData.imposters) ? null :
							<Imposters
								imposters={record.reportData.imposters}
							/>
						}
						{ _.isEmpty(record.reportData.ssn_info) ? null :
							<SocialSecurity
								ssn={record.reportData.ssn_info}
							/>
						}
						{ _.isEmpty(record.reportData.voter_registrations) ? null :
							<VoterRegistrations
								registrations={record.reportData.voter_registrations}
							/>
						}
					</div>
				: null }

				{!(_.isEmpty(record.reportData.controlled_substances) &&
					_.isEmpty(record.reportData.faa_licenses) &&
					_.isEmpty(record.reportData.hunting_fishing_licenses) &&
					_.isEmpty(record.reportData.professional_licenses) &&
					_.isEmpty(record.reportData.weapon_permits)) ?
						<Licenses
							name={record.reportData.names[0].first}
							faaLicenses={record.reportData.faa_licenses || null}
							controlledSubstances={record.reportData.controlled_substances}
							huntingFishingLicenses={record.reportData.hunting_fishing_licenses}
							professionalLicenses={record.reportData.professional_licenses}
							weaponPermits={record.reportData.weapon_permits || null}
						/> : null
				}

				{/*               Premium Sections           */}
				{ isPremium ?
					<div>
						{ _.isEmpty(record.reportData.accidents) ? null :
							<Accidents
								accidents={record.reportData.accidents}
							/>
						}

						{ _.isEmpty(record.reportData.corporate_affiliations) ? null :
							<Businesses
								businesses={record.reportData.corporate_affiliations}
							/>
						}

						{ _.isEmpty(record.reportData.properties) ? null :
							<Assets
								assets={record.reportData.properties}
							/>
						}
						{ _.isEmpty(record.reportData.bankruptcies) ? null :
							<Bankruptcies
								bankruptcies={record.reportData.bankruptcies}
							/>
						}
						{ _.isEmpty(record.reportData.liens_judgments) ? null :
							<Liens
								liens={record.reportData.liens_judgments}
							/>
						}
						{ _.isEmpty(record.reportData.watercrafts) ? null :
							<Watercrafts
								watercrafts={record.reportData.watercrafts}
							/>
						}
					</div>
				: null }

				{ !isPremium ?
					<section id="premiumUpsell" className="widget premium">
						<h2 className="title" >
							PREMIUM DATA
						</h2>
						<p className="intro">Premium Data may be available and could include additional <span>potentially sensitive information</span> about {record.reportData.names[0].first}. In order to view Premium Data, you must first authorize this access.</p>
						<p className="includes">Premium Data May Include:</p>
						<ul>
							<li>Bankruptcy Filings</li>
							<li>Properties Owned</li>
							<li>Civil Judgments</li>
							<li>Tax Liens</li>
							<li>Foreclosures</li>
							<li>Corporate Affiliations</li>
							<li>Water Craft Owned</li>
							<li>Voter Registration</li>
							<li>Education Information</li>
							<li>Professional Licenses</li>
							<li>Hunting/Fishing Permits</li>
							<li>Weapons Permits</li>
							<li>Prior Addresses</li>
							<li>Auto Accident Information</li>
							<li>Information on Neighbors</li>
							<li>Business Associates</li>
							<li>Additional Phone Numbers</li>
							<li>And More!!</li>
						</ul>
						<button onClick={ () => viewActions.showPremiumUpsell(record.id[2]) } className="btn btn-upgrade">View More Information</button>
					</section>
					: null
				}
			</RouteTransition>
		</main>
	);
};

PersonRecord.propTypes = {
	record: PropTypes.object.isRequired,
	openLocation: PropTypes.func.isRequired,
	openCrime: PropTypes.func.isRequired,
	location: PropTypes.object
};

export default PersonRecord;
