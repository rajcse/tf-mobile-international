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
import BusinessesTu from './businessesTu';
import Assets from './assets';
import CurrentProperties from './currentProperties';
import Bankruptcies from './bankruptcies';
//import Foreclosures from './foreclosures';
import LiensJudgments from './liensJudgments';
import Liens from './liens';
import Judgments from './judgments';
import Evictions from './evictions';
import Imposters from './imposters';
import Watercrafts from './watercrafts';
import Associates from './associates';
import Relationships from './relationships';
import VoterRegistrations from './voter';
import Accidents from './accidents';
import viewActions from '../actions/viewActions';
import StudentRecords from './shared/StudentRecords';
import SocialSecurity from './security';
import UccFilings from './uccfilings';

const PersonRecord = (props) => {
	let { record, openLocation, openCrime, appState } = props,
		isPremium = record.data.isPremium,
		age = null,
		deathYear = null,
		location = '',
		isTransUnion = record.reportData['@provider'].includes('transunion');

	location = record.reportData.locations && record.reportData.locations.length > 0 ? `${record.reportData.locations[0].address.city}, ${record.reportData.locations[0].address.state_code}` : null;

	age = libs.calculateAge(record.reportData.dobs[0], record.reportData.dods[0]);
	deathYear = age.deathday ? null : moment(age.deathday, 'MM/DD/YYYY').year();
	return (
		<main>
			<Header title={`${record.reportData.names[0].first}'s Report`} backButton />

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
						{ _.isEmpty(record.reportData.all_associates) ? null :
							<Associates
								associates={record.reportData.all_associates}
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

				<Licenses
					faaLicenses={record.reportData.faa_licenses || []}
					controlledSubstances={record.reportData.controlled_substances || []}
					huntingFishingLicenses={record.reportData.hunting_fishing_licenses || []}
					professionalLicenses={record.reportData.professional_licenses || []}
					weaponPermits={record.reportData.weapon_permits || []}
				/>

				{/*               Premium Sections           */}
				{ isPremium ?
					<div>
						{ _.isEmpty(record.reportData.accidents) ? null :
							<Accidents
								accidents={record.reportData.accidents}
							/>
						}

						{ _.isEmpty(record.reportData.corporate_affiliations) || isTransUnion ? null :
							<Businesses
								businesses={record.reportData.corporate_affiliations}
							/>
						}

						{ _.isEmpty(record.reportData.tu_corporate_filings) || !isTransUnion ? null :
							<BusinessesTu
								businesses={record.reportData.tu_corporate_filings}
							/>
						}

						{ _.isEmpty(record.reportData.properties) ? null :
							<Assets
								assets={record.reportData.properties}
							/>
						}
						{ _.isEmpty(record.reportData.current_properties) ? null :
							<CurrentProperties
								currentProperties={record.reportData.current_properties}
							/>
						}
						{/* _.isEmpty(record.reportData.foreclosures) ? null :
							<Foreclosures
								foreclosures={record.reportData.foreclosures}
							/>
						*/}
						{ _.isEmpty(record.reportData.bankruptcies) ? null :
							<Bankruptcies
								bankruptcies={record.reportData.bankruptcies}
							/>
						}
						{ _.isEmpty(record.reportData.liens_judgments) ? null :
							<LiensJudgments
								liensJudgments={record.reportData.liens_judgments}
							/>
						}
						{ _.isEmpty(record.reportData.liens) ? null :
							<Liens
								liens={record.reportData.liens}
							/>
						}
						{ _.isEmpty(record.reportData.judgments) ? null :
							<Judgments
								judgments={record.reportData.judgments}
							/>
						}
						{ _.isEmpty(record.reportData.evictions) ? null :
							<Evictions
								evictions={record.reportData.evictions}
							/>
						}
						{ _.isEmpty(record.reportData.watercrafts) ? null :
							<Watercrafts
								watercrafts={record.reportData.watercrafts}
							/>
						}

						{ _.isEmpty(record.reportData.ucc_filings) ? null :
							<UccFilings
								uccFilings={record.reportData.ucc_filings}
							/>
						}
					</div>
				: null }

				{ (!isPremium && appState.premiumAccess) ?
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
