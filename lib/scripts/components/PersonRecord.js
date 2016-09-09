import React, { Component, PropTypes } from 'react';

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
import PremiumUpsellPrompt from './app/PremiumUpsellPrompt';
import RecordLoader from './RecordLoader';
import StudentRecords from './shared/StudentRecords';
import SocialSecurity from './security';

class PersonRecord extends Component {
	constructor(props) {
		super(props);

		this.state = {
			premiumModal: false,
			loading: false
		};

		this.confirmUpsell = this.confirmUpsell.bind(this);
		this.cancelUpsell = this.cancelUpsell.bind(this);
	}

	componentWillReceiveProps() {
		if(this.props.record.data.isPremium) {
			this.setState({
				loading: false
			});
		}
	}

	confirmUpsell() {
		this.setState({
			loading: true,
			premiumModal: false
		});

		viewActions.confirmUpsell({recordId: this.props.record.id[2]});
	}

	calculateAge(date) {
		// Check if dob exist
		if (_.isNull(date) || _.isEmpty(date)) {
			return null;
		}

		// Format Date
		date = moment(`${date.month}/${date.day}/${date.year}`, 'MM/DD/YYYY');
		return moment().diff(date, 'years');
	}

	cancelUpsell() {
		this.setState({
			premiumModal: false
		});
		viewActions.cancelUpsell();
	}

	popupPremiumUpsell() {
		this.setState({
			premiumModal: true
		});
	}

	render() {
		let props = this.props;
		let { record, openLocation, openCrime } = props;
		let	isPremium = record.data.isPremium;

		let age = _.has(record.reportData,'dobs[0].age') ? record.reportData.dobs[0].age : null;
		let birthday = _.has(record.reportData,'dobs[0].date') ? record.reportData.dobs[0].date : null;

		age = _.isNull(age) || age >= 0 ? this.calculateAge(birthday) : null;

		let location = !_.isEmpty(record.reportData.locations) ? `${record.reportData.locations[0].address.city}, ${record.reportData.locations[0].address.state_code}` : null;

		return (
			<main>
				<Header title={record.reportData.names[0].first} backButton />

				<ReportHeader
					name={record.reportData.names[0].display}
					age={age}
					birthday={birthday}
					location={location}
					photo={record.reportData.images[0]}
					isPremium={isPremium}
				/>

				<PersonalSection
					nameTitle="Name"
					aliasTitle="Aliases"
					name={record.reportData.names[0].display}
					gender={_.has(record.reportData,'gender.content') ? record.reportData.gender.content : null}
					aliases={record.reportData.names.slice(1)}
					birthdate={birthday}
					age={age}
					zodiac={_.has(record.reportData,'dobs[0].zodiac') ? record.reportData.dobs[0].zodiac : null}
					photos={record.reportData.images}
					jobs={record.reportData.jobs}
					education={record.reportData.educations}
					relatives={record.reportData.related_persons}
					calculateAge={this.calculateAge}
				/>

				{/*               Premium Sections           */}
				{ isPremium ?
					<div>
						{ _.isEmpty(record.reportData.associates) ? null :
							<Associates
								associates={record.reportData.associates}
								calculateAge={this.calculateAge}
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
					crimes={record.reportData.criminal_records}
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

				{ ( _.isNull(record.reportData.faa_licenses) 
					&& _.isNull(record.reportData.controlled_substances) 
					&& _.isNull(record.reportData.professional_licenses)
					&& _.isNull(record.reportData.weapon_permits)
					&& _.isNull(record.reportData.hunting_fishing_licenses) ) ?

					<LicensesSection
						name={record.reportData.names[0].first}
						faaLicenses={record.reportData.faa_licenses}
						controlledSubstances={record.reportData.controlled_substances}
						huntingFishingLicenses={record.reportData.hunting_fishing_licenses}
						professionalLicenses={record.reportData.professional_licenses}
						weaponPermits={record.reportData.weapon_permits}
					/> 
				: null }

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

				{ isPremium !== true ?
					<section id="upsell" className="widget">
						<h2 className="title" >
							PREMIUM DATA
						</h2>
						<p>Premium Data may be available and could include additional potentially sensitive information. In order to view Premium Data, you must first authorize this access.</p>
						<button onTouchTap={ () => { this.popupPremiumUpsell(); } } className="btn btn-upgrade">View More Information</button>
					</section> 
					: null
				}
				{ (isPremium !== true && this.state.premiumModal) ?
					<PremiumUpsellPrompt
						confirmUpsell={this.confirmUpsell}
						cancelUpsell={this.cancelUpsell}
					/>
					: null
				}
				{ (this.state.loading) ?
					<RecordLoader />
					: null
				}
			</main>
		);
	}
}

PersonRecord.propTypes = {
	record: PropTypes.object.isRequired,
	openLocation: PropTypes.func.isRequired,
	openCrime: PropTypes.func.isRequired
};

export default PersonRecord;
