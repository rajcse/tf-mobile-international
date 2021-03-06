import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import Svg from 'components/svg/Svg';
import moment from 'moment';
import { RouteTransition } from 'react-router-transition';
import Header from 'components/Header';
// import pubRecAPI from 'utils/PubRecAPI';
// import firebaseClient from 'utils/firebaseClient';

// Global Functions File
import * as libs from 'utils/libs';

import RecordHeader from '../components/RecordHeader';
import Personal from '../components/Personal';
import Contact from '../components/Contact';
import Locations from '../components/Locations';
import Social from '../components/Social';
import Licenses from '../components/Licenses';
// import Businesses from '../components/Businesses';
import CorporateFilings from '../components/CorporateFilings';
import Trademarks from '../components/Trademarks';
// import Assets from '../components/Assets';
import CurrentProperties from '../components/CurrentProperties';
// import Bankruptcies from '../components/Bankruptcies';
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
import UccFilingsTu from '../components/UccfilingsTu';

// import viewActions from 'actions/viewActions';
import StudentRecords from '../components/StudentRecords';

class PersonRecord extends Component {
	constructor(props) {
		super(props);

		this.showPremiumUpsell = this.showPremiumUpsell.bind(this);
		this.showUpsell = this.showUpsell.bind(this);

		this.state = {
			upsell: 'standard'
		};
	}

	componentWillMount() {
/*		if(this.props.appState.userHasRated 
			&& !_.get(this.props.record.data, 'isPremium', false)
			&& !this.props.appState.userSeenTimedUpsell) { 
			setTimeout(pubRecAPI.fetchPremiumUpsellInfo(this.props.record, true), 3000);
		}

		firebaseClient.getConfigValue('upsell')
			.then(response => {
				this.setState({
					upsell: response
				});
				firebaseClient.setUserProperty('upsell', response);
			});*/
	}

	showPremiumUpsell() {
		//viewActions.showPremiumUpsell(this.props.record);
	}

	showUpsell() {
		/*
		if (this.state.upsell == 'premium') {
			viewActions.showPremiumUpsell(this.props.record);
		} else {
			viewActions.showStandardUpsell(this.props.record);
			viewActions.showPremiumUpsell(this.props.record);
		}*/
	}

	render() {
		let {
			record,
			openLocation
		} = this.props;

		let	isPremium = _.get(record.data, 'isPremium', false),
			age = null,
			deathYear = null,
			location = '';

		location = record.reportData.locations && record.reportData.locations.length > 0 ? `${record.reportData.locations[0].address.city}, ${record.reportData.locations[0].address.state_code}` : null;

		age = libs.calculateAge(record.reportData.dobs[0], record.reportData.dods[0]);
		deathYear = age.deathday ? null : moment(age.deathday, 'MM/DD/YYYY').year();
		return (
			<main className={`person ${isPremium ? 'premium' : ''}`}>
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
					{ record.reportData.possible_sex_offender &&
						<section id="possible-offender" className="widget widget-error">
							<h2 className="title"><Svg svg="exclamationWhite" /> Possible <strong>Sex Offender</strong></h2>
							<p className="intro">Our sources show that this person may be a <span>registered sex offender</span>.</p>
						</section>
					}

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
						showPremiumUpsell={false}
					/>

					{ !_.isEmpty(record.reportData.sources) &&
						<Social
							name={record.reportData.names[0].first}
							accounts={record.reportData.sources}
							links={record.reportData.urls}
							usernames={record.reportData.usernames}
						/> 
					}

					{/*               Premium Sections           */}
					{ isPremium &&
						<div>
							{ (!_.isEmpty(record.reportData.associates) || !_.isEmpty(record.reportData.possible_associates)) &&
								<Associates
									associates={record.reportData.associates}
									possibleAssociates={record.reportData.possible_associates}
									calculateAge={libs.calculateAge}
								/>
							}

							{ !_.isEmpty(record.reportData.possible_student_records) &&
								<StudentRecords records={record.reportData.possible_student_records} />
							}

							{ !_.isEmpty(record.reportData.relationships) &&
								<Relationships name={record.reportData.names[0].first} relationships={record.reportData.relationships} />
							}

							{ !_.isEmpty(record.reportData.imposters) &&
								<Imposters imposters={record.reportData.imposters} />
							}

							{ !_.isEmpty(record.reportData.ssn_info) &&
								<SocialSecurity ssn={record.reportData.ssn_info} />
							}

							{ !_.isEmpty(record.reportData.voter_registrations) &&
								<VoterRegistrations registrations={record.reportData.voter_registrations} />
							}
						</div>
					}

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
					{ isPremium && !_.isEmpty(record.reportData.accidents) &&
						<Accidents accidents={record.reportData.accidents} />
					}

					{/*<Businesses
						businesses={record.reportData.corporate_affiliations}
						name={record.reportData.names[0].display}
						isPremium={isPremium}
						showPremiumUpsell={this.showPremiumUpsell}
					/>*/}

					{ isPremium && !_.isEmpty(record.reportData.tu_corporate_filings) &&
						<CorporateFilings corporateFilings={record.reportData.tu_corporate_filings} />
					}

					{ isPremium && !_.isEmpty(record.reportData.trademarks) &&
						<Trademarks trademarks={record.reportData.trademarks} />
					}

					{/*<Assets
						assets={record.reportData.properties}
						name={record.reportData.names[0].display}
						isPremium={isPremium}
						showPremiumUpsell={this.showPremiumUpsell}
					/>*/}

					{ isPremium && !_.isEmpty(record.reportData.current_properties) &&
						<CurrentProperties currentProperties={record.reportData.current_properties} />
					}
					
					{/*
					<Bankruptcies
						bankruptcies={record.reportData.bankruptcies}
						name={record.reportData.names[0].display}
						isPremium={isPremium}
						showPremiumUpsell={this.showPremiumUpsell}
					/>*/}

					{ isPremium &&
						<div>
							{ !_.isEmpty(record.reportData.liens_judgments) &&
								<LiensJudgments liensJudgments={record.reportData.liens_judgments} />
							}

							{ !_.isEmpty(record.reportData.liens) &&
								<Liens liens={record.reportData.liens} />
							}

							{ !_.isEmpty(record.reportData.judgments) &&
								<Judgments judgments={record.reportData.judgments} />
							}

							{ !_.isEmpty(record.reportData.evictions) &&
								<Evictions evictions={record.reportData.evictions} />
							}

							{ !_.isEmpty(record.reportData.watercrafts) &&
								<Watercrafts watercrafts={record.reportData.watercrafts} />
							}

							{ !_.isEmpty(record.reportData.ucc_filings) &&
								<UccFilings uccFilings={record.reportData.ucc_filings} />
							}

							{ !_.isEmpty(record.reportData.tu_ucc_filings) &&
								<UccFilingsTu uccFilingsTu={record.reportData.tu_ucc_filings} />
							}
						</div>
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
