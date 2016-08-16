import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

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
import Liens from './liens';
import Associates from './associates';
import Relationships from './relationships';
import VoterRegistrations from './voter';
import Accidents from './accidents';

import ReportHeader from './shared/ReportHeader';

class PersonReport extends Component {
	calculateAge(date) {
		// Check if dob exist
		if (_.isNull(date) || _.isEmpty(date)) {
			return null;
		}

		// Format Date
		date = moment(`${date.month}/${date.day}/${date.year}`, 'MM/DD/YYYY');

		return moment().diff(date, 'years');
	}

	render() {
		let { person } = this.props;
		let	isPremium = person.reportMeta.isPremium;

		let age = _.has(person,'dobs[0].age') ? person.dobs[0].age : null;
		let birthday = _.has(person,'dobs[0].date') ? person.dobs[0].date : null;

		age = _.isNull(age) || age >= 0 ? this.calculateAge(birthday) : null;

		let location = `${person.locations[0].address.city}, ${person.locations[0].address.state_code}`;

		return (
			<main>
				<ReportHeader
					name={person.names[0].display}
					age={age}
					birthday={birthday}
					location={location}
				/>

				<PersonalSection
					nameTitle='Name'
					aliasTitle='Aliases'
					name={person.names[0].display}
					gender={_.has(person,'gender.content') ? person.gender.content : null}
					aliases={person.names.slice(1)}
					birthdate={birthday}
					age={age}
					zodiac={_.has(person,'dobs[0].zodiac') ? person.dobs[0].zodiac : null}
					photos={person.images}
					jobs={person.jobs}
					education={person.educations}
					relatives={person.related_persons}
				/>

				{ isPremium === true ?
					<Associates
						associates={person.associates}
					/> : null
				}

				{ isPremium === true ?
					<Relationships
						relationships={person.relationships}
					/> : null
				}
				{ isPremium === true ?
					<VoterRegistrations
						registrations={person.voter_registrations}
					/> : null
				}

				<ContactSection
					phones={person.phones}
					emails={person.emails}
				/>

				<LocationSection
					locations={person.locations}
					isPremium={isPremium}
				/>

				{ !_.isEmpty(person.criminal_records) ?
					<CriminalRecordsSection
						crimes={person.criminal_records}
					/> : null
				}

				{ !_.isEmpty(person.sources) ?
					<SocialSection
						accounts={person.sources}
						links={person.urls}
					/> : null
				}

				<LicensesSection
					name={person.names[0].display}
					faa_licenses={person.faa_licenses}
					controlled_substances={person.controlled_substances}
					hunting_fishing_licenses={person.hunting_fishing_licenses}
					professional_licenses={person.professional_licenses}
					weapon_permits={person.weapon_permits}
				/>

				{/*               Premium Sections           */}
				{ isPremium ?
					<div id="premium-section">
						{/* TODO:Fallbak to default section */}
						{_.isEmpty(person.accidents) ? null :
							<Accidents
								accidents={person.accidents}
							/>
						}

						{ _.isEmpty(person.corporate_affiliations) ? null :
							<Businesses
								businesses={person.corporate_affiliations}
							/>
						}

						{ _.isEmpty(person.properties) ? null :
							<Assets
								assets={person.properties}
							/>
						}

						{ _.isEmpty(person.watercrafts) ? null :
							<Watercrafts
								watercrafts={person.watercrafts}
							/>
						}

						{ _.isEmpty(person.liens_judgments) ? null :
							<Liens
								liens={person.liens_judgments}
							/>
						}
					</div>
				: null }
			</main>
		);
	}
}

export default PersonReport;
