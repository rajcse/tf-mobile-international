import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import Svg from 'components/svg/Svg';
import moment from 'moment';
import { RouteTransition } from 'react-router-transition';
import Header from 'components/Header';
import ReportHeaderUpsell from 'components/ReportHeaderUpsell';

// Global Functions File
import * as libs from 'utils/libs';

import RecordHeader from '../components/RecordHeader';
import CriminalRecords from '../components/CriminalRecords';
import Personal from '../components/Personal';
import Contact from '../components/Contact';
import Locations from '../components/Locations';
import Social from '../components/Social';
import Licenses from '../components/Licenses';
import Businesses from '../components/Businesses';
import CorporateFilings from '../components/CorporateFilings';
import Assets from '../components/Assets';
import CurrentProperties from '../components/CurrentProperties';
import Bankruptcies from '../components/Bankruptcies';
import LiensJudgments from '../components/LiensJudgments';
import Liens from '../components/Liens';
import Judgments from '../components/Judgments';
import Evictions from '../components/Evictions';
import Imposters from '../components/Imposters';
import Watercrafts from '../components/Watercrafts';
import Associates from '../components/Associates';
import Relationships from '../components/Relationships';
import VoterRegistrations from '../components/VoterRegistrations';
import Accidents from '../components/Accidents';
import SocialSecurity from '../components/SocialSecurity';
import UccFilings from '../components/Uccfilings';

import viewActions from 'actions/viewActions';
import StudentRecords from '../components/StudentRecords';


class PersonRecord extends Component {
	constructor(props) {
		super(props);

		viewActions.showPremiumUpsell = viewActions.showPremiumUpsell.bind(this);
	}

	render() {
		let {
			record,
			openLocation,
			openCrime
		} = this.props;

		let	isPremium = _.get(record.data, 'isPremium', false),
			age = null,
			deathYear = null,
			location = '';

		location = record.reportData.locations && record.reportData.locations.length > 0 ? `${record.reportData.locations[0].address.city}, ${record.reportData.locations[0].address.state_code}` : null;

		age = libs.calculateAge(record.reportData.dobs[0], record.reportData.dods[0]);
		deathYear = age.deathday ? null : moment(age.deathday, 'MM/DD/YYYY').year();

		return (
			<main className={ (!isPremium) ? 'no-premium' : 'has-premium'}>
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
					{ (!isPremium) ?
						<ReportHeaderUpsell
							showPremiumUpsell={viewActions.showPremiumUpsell}
							recordID={record.id[2]}
						/>
					: null }

					<RecordHeader
						name={record.reportData.names[0].display}
						age={age.display}
						deathdate={deathYear}
						birthdate={age.birthday}
						location={location}
						photos={record.reportData.images}
						isPremium={isPremium}
					/>

					{/* Possible Sex Offender*/}
					{ record.reportData.possible_sex_offender ?
						<section id="possible-offender" className="widget widget-error">
							<h2 className="title"><Svg svg="exclamationWhite" /> Possible <strong>Sex Offender</strong></h2>
							<p className="intro">Our sources show that this person may be a <span>registered sex offender</span>.</p>
						</section>
					: null }

					<Personal
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

					<Contact
						phones={record.reportData.phones}
						emails={record.reportData.emails}
					/>

					<Locations
						locations={record.reportData.locations}
						openLocation={openLocation}
						isPremium={isPremium}
					/>

					<CriminalRecords
						name={record.reportData.names[0].first}
						filteredCrimes={record.reportData.filteredCriminalRecords}
						openCrime={openCrime}
					/>

					{ (!isPremium) ?
						<Assets
							assets={record.reportData.properties}
							name={record.reportData.names[0].display}
							isPremium={isPremium}
							showPremiumUpsell={viewActions.showPremiumUpsell}
							recordID={record.id[2]}
						/>
					: null }

					{ !_.isEmpty(record.reportData.sources) ?
						<Social
							name={record.reportData.names[0].first}
							accounts={record.reportData.sources}
							links={record.reportData.urls}
							usernames={record.reportData.usernames}
						/> : null
					}

					{/*               Premium Sections           */}
					{ isPremium ?
						<div>
							{ _.isEmpty(record.reportData.associates) && _.isEmpty(record.reportData.possible_associates)
								? null
									: <Associates
										associates={record.reportData.associates}
										possibleAssociates={record.reportData.possible_associates}
										calculateAge={libs.calculateAge}
									  />
							}

							{ _.isEmpty(record.reportData.possible_student_records)
								? null
									: <StudentRecords
										records={record.reportData.possible_student_records}
									  />
							}

							{ _.isEmpty(record.reportData.relationships)
								? null
									: <Relationships
										name={record.reportData.names[0].first}
										relationships={record.reportData.relationships}
									  />
							}
							{ _.isEmpty(record.reportData.imposters)
								? null
									:	<Imposters
										imposters={record.reportData.imposters}
										 />
							}
							{ _.isEmpty(record.reportData.ssn_info)
								? null
									:	<SocialSecurity
										ssn={record.reportData.ssn_info}
										 />
							}
							{ _.isEmpty(record.reportData.voter_registrations)
								? null
									:	<VoterRegistrations
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
						_.isEmpty(record.reportData.accidents) ? null : <Accidents
							accidents={record.reportData.accidents}
																														/>
					: null }

					<Businesses
						businesses={record.reportData.corporate_affiliations}
						name={record.reportData.names[0].display}
						isPremium={isPremium}
						showPremiumUpsell={viewActions.showPremiumUpsell}
						recordID={record.id[2]}
					/>

					{ isPremium ?
						_.isEmpty(record.reportData.tu_corporate_filings)
						? null
							:	<CorporateFilings
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
						_.isEmpty(record.reportData.current_properties)
						? null
							:	<CurrentProperties
								currentProperties={record.reportData.current_properties}
								 />
					: null }

					<Bankruptcies
						bankruptcies={record.reportData.bankruptcies}
						name={record.reportData.names[0].display}
						isPremium={isPremium}
						showPremiumUpsell={viewActions.showPremiumUpsell}
						recordID={record.id[2]}
					/>

					{ isPremium ?
						<div>
							{ _.isEmpty(record.reportData.liens_judgments)
								? null
									: <LiensJudgments
										liensJudgments={record.reportData.liens_judgments}
									  />
							}

							{ _.isEmpty(record.reportData.liens)
								? null
									: <Liens
										liens={record.reportData.liens}
									  />
							}
							{ _.isEmpty(record.reportData.judgments)
								? null
									:	<Judgments
										judgments={record.reportData.judgments}
										 />
							}
							{ _.isEmpty(record.reportData.evictions)
								? null
									: <Evictions
										evictions={record.reportData.evictions}
									  />
							}

							{ _.isEmpty(record.reportData.watercrafts)
								? null
									: <Watercrafts
										watercrafts={record.reportData.watercrafts}
									  />
							}

							{
								_.isEmpty(record.reportData.ucc_filings)
								? null
									:	<UccFilings
										uccFilings={record.reportData.ucc_filings}
										 />
							}
						</div>
					: null }

					{ (!isPremium) ?
						<section id="premiumUpsell" className="widget premium">
							<h2 className="title" >
								PREMIUM DATA
							</h2>
							<p className="intro">
								Premium Data may be available and could include additional <span>potentially sensitive information </span>
								about {record.reportData.names[0].first}. In order to view Premium Data, you must first authorize this access.
							</p>
							<p className="includes">Premium Data May Include:</p>
							<ul>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Bankruptcy Filings</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Properties Owned</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Civil Judgments</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Tax Liens</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Foreclosures</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Corporate Affiliations</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Water Craft Owned</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Voter Registration</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Education Information</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Professional Licenses</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Hunting/Fishing Permits</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Weapons Permits</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Prior Addresses</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Auto Accident Information</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Information on Neighbors</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Business Associates</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>Additional Phone Numbers</li>
								<li><Svg svg="premiumStarIcon" style={{width: 10}}/>And More!!</li>
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
