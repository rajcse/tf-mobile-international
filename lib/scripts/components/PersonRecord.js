import React, { PropTypes } from 'react';

import _ from 'lodash';
import moment from 'moment';
import Header from './shared/Header';
import ReportHeader from './shared/ReportHeader';

import CriminalRecordsSection from './criminal';
import PersonalSection from './personal';
import ContactSection from './contact';
import LocationSection from './location';
import SocialSection from './social';
import LicensesSection from './licenses';
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

function calculateAge(date) {
	// Check if dob exist
	if (_.isNull(date) || _.isEmpty(date)) {
		return null;
	}

	// Format Date
	date = moment(`${date.month}/${date.day}/${date.year}`, 'MM/DD/YYYY');
	return moment().diff(date, 'years');
}

const PersonRecord = (props) => {
	let { record, openLocation, openCrime } = props,
		isPremium = record.data.isPremium,
		birthday = null,
		deathday = null,
		birthRange = false,
		deathRange = false,
		age = null;

	// TODO: Update this to better support ranges instead of just taking the start of the range
	if (record.reportData.dobs.length) {
		if (record.reportData.dobs[0].date) {
			birthday = record.reportData.dobs[0].date;
		} else {
			birthday = record.reportData.dobs[0].date_range.start;
			birthRange = true;
		}
	}
	if (record.reportData.dods.length) {
		if (record.reportData.dods[0].date) {
			deathday = record.reportData.dods[0].date;
		} else {
			deathday = record.reportData.dods[0].date_range.start;
			deathRange = true;
		}
	}
	// TODO: Use actual date range instead of just low side
	// We do this outside of the birthday logic because there could be an age associated with a birthday range
	if (deathday) {
		if (_.has(record.reportData,'dods[0].age')) {
			age = record.reportData.dods[0].age;
		} else if (_.has(record.reportData,'dods[0].age_range.low')) {
			age = record.reportData.dods[0].age_range.low;
		}
	} else {
		if (_.has(record.reportData,'dobs[0].age')) {
			age = record.reportData.dobs[0].age;
		} else if (_.has(record.reportData,'dobs[0].age_range.low')) {
			age = record.reportData.dobs[0].age_range.low;
		}
	}

	let location = !_.isEmpty(record.reportData.locations) ? `${record.reportData.locations[0].address.city}, ${record.reportData.locations[0].address.state_code}` : null;

	return (
		<main>
			<Header title={record.reportData.names[0].first} backButton />

			<ReportHeader
				name={record.reportData.names[0].display}
				age={age}
				deathdate={deathday}
				birthday={birthday}
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
				birthdate={birthday}
				deathdate={deathday}
				age={age}
				zodiac={_.has(record.reportData,'dobs[0].zodiac') ? record.reportData.dobs[0].zodiac : null}
				photos={record.reportData.images}
				jobs={record.reportData.jobs}
				education={record.reportData.educations}
				relatives={record.reportData.related_persons}
				calculateAge={calculateAge}
				birthRange={birthRange}
				deathRange={deathRange}
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
				likelyCrimes={record.reportData.likelyCriminalRecords}
				possibleCrimes={record.reportData.possibleCriminalRecords}
				unlikelyCrimes={record.reportData.unlikelyCriminalRecords}
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
							calculateAge={calculateAge}
						/>
					}
					{ _.isEmpty(record.reportData.possible_student_records) ? null :
						<StudentRecords
							records={record.reportData.possible_student_records}
						/>
					}
					<Relationships
						name={record.reportData.names[0].first}
						relationships={record.reportData.relationships}
					/>
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

			<LicensesSection
				name={record.reportData.names[0].first}
				faaLicenses={record.reportData.faa_licenses}
				controlledSubstances={record.reportData.controlled_substances}
				huntingFishingLicenses={record.reportData.hunting_fishing_licenses}
				professionalLicenses={record.reportData.professional_licenses}
				weaponPermits={record.reportData.weapon_permits}
			/>

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
		</main>
	);
};

PersonRecord.propTypes = {
	record: PropTypes.object.isRequired,
	openLocation: PropTypes.func.isRequired,
	openCrime: PropTypes.func.isRequired
};

export default PersonRecord;
