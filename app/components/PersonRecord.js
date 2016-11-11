import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { RouteTransition } from 'react-router-transition';
import Header from './shared/Header';
import ReportHeader from './shared/ReportHeader';
import ReportHeaderUpsell from './shared/ReportHeaderUpsell';

// Global Functions File
import * as libs from '../utils/libs';

import CriminalRecordsSection from './criminal';
import PersonalSection from './personal';
import ContactSection from './contact';
import LocationSection from './location';
import SocialSection from './social';
import Licenses from './licenses';
import Businesses from './businesses';
import CorporateFilings from './corporateFilings';
import Assets from './assets';
import CurrentProperties from './currentProperties';
import Bankruptcies from './bankruptcies';
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

class PersonRecord extends Component {
	constructor(props) {
		super(props);

		viewActions.showPremiumUpsell = viewActions.showPremiumUpsell.bind(this);
	}

	render() {
		let {
			record,
			openLocation,
			openCrime,
			appState
		} = this.props;

		let	isPremium = _.get(record.data, 'isPremium', false),
			age = null,
			deathYear = null,
			location = '';

		location = record.reportData.locations && record.reportData.locations.length > 0 ? `${record.reportData.locations[0].address.city}, ${record.reportData.locations[0].address.state_code}` : null;

		age = libs.calculateAge(record.reportData.dobs[0], record.reportData.dods[0]);
		deathYear = age.deathday ? null : moment(age.deathday, 'MM/DD/YYYY').year();

		return (
			<main className={ (!isPremium && appState.premiumAccess) ? 'no-premium' : 'has-premium'}>
				<Header title={`${record.reportData.names[0].first}'s Report`} backButton />

				<RouteTransition
					component="div"
					runOnMount={true}
					pathname={this.props.location.pathname}
					className="transition-wrapper"
					atEnter={{ opacity: 0 }}
					atLeave={{ opacity: 0 }}
					atActive={{ opacity: 1 }}
				>
					{/* Premium Upsell Sticky Header */}
					{ (!isPremium && appState.premiumAccess) ?
						<ReportHeaderUpsell
							showPremiumUpsell={viewActions.showPremiumUpsell}
							recordID={record.id[2]}
						/>
					: null }

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

					{ (!isPremium && appState.premiumAccess) ?
						<Assets
							assets={record.reportData.properties}
							name={record.reportData.names[0].display}
							isPremium={isPremium}
							showPremiumUpsell={viewActions.showPremiumUpsell}
							recordID={record.id[2]}
						/>
					: null }

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
							{ _.isEmpty(record.reportData.associates) && _.isEmpty(record.reportData.possible_associates) ? null :
								<Associates
									associates={record.reportData.associates}
									possibleAssociates={record.reportData.possible_associates}
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
						professionalLicensesTu={record.reportData.tu_professional_licenses || []}
						weaponPermits={record.reportData.weapon_permits || []}
						concealedWeaponPermitsTu={record.reportData.tu_concealed_weapon_permits || []}
						huntingPermitsTu={record.reportData.tu_hunting_permits || []}
					/>

					{/*               Premium Sections           */}
					{ isPremium ?
						_.isEmpty(record.reportData.accidents) ? null :
							<Accidents
								accidents={record.reportData.accidents}
							/>
					: null }

					{ isPremium ?
						<Businesses
							businesses={record.reportData.corporate_affiliations}
							name={record.reportData.names[0].display}
							isPremium={isPremium}
							showPremiumUpsell={viewActions.showPremiumUpsell}
							recordID={record.id[2]}
						/> : null }

					{ isPremium ?
						_.isEmpty(record.reportData.tu_corporate_filings) ? null :
							<CorporateFilings
								corporateFilings={record.reportData.tu_corporate_filings}
							/>
					: null }

					{ isPremium ?
						<Assets
							assets={record.reportData.properties}
							name={record.reportData.names[0].display}
							isPremium={isPremium}
							showPremiumUpsell={viewActions.showPremiumUpsell}
							recordID={record.id[2]}
						/>
					: null }

					{ isPremium ?
						_.isEmpty(record.reportData.current_properties) ? null :
							<CurrentProperties
								currentProperties={record.reportData.current_properties}
							/>
					: null }

					{ (!isPremium && appState.premiumAccess || isPremium) ?
						<Bankruptcies
							bankruptcies={record.reportData.bankruptcies}
							name={record.reportData.names[0].display}
							isPremium={isPremium}
							showPremiumUpsell={viewActions.showPremiumUpsell}
							recordID={record.id[2]}
						/>
					: null }

					{ isPremium ?
						<div>
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
							<p className="intro">
								Premium Data may be available and could include additional <span>potentially sensitive information</span>
								about {record.reportData.names[0].first}. In order to view Premium Data, you must first authorize this access.
							</p>
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
	}
}

PersonRecord.propTypes = {
	record: PropTypes.object.isRequired,
	openLocation: PropTypes.func.isRequired,
	openCrime: PropTypes.func.isRequired,
	location: PropTypes.object,
	appState: PropTypes.object
};

export default PersonRecord;
