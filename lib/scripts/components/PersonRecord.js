import React, { Component, PropTypes } from 'react';

import _ from 'lodash';
import moment from 'moment';
import Header from './Shared/Header';
import ReportHeader from './shared/ReportHeader';

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
import viewActions from '../actions/viewActions';
import PremiumUpsellPrompt from './app/PremiumUpsellPrompt';
import RecordLoader from './RecordLoader';

class PersonRecord extends Component {


	constructor(props) {
 		super(props);

		this.state = {
			premiumModal: false,
			recordId: this.props.recordId,
			loading: false
		}
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

	confirmUpsell(recordId) {
		this.setState({
			loading: true,
			premiumModal: false
		});
		viewActions.confirmUpsell({recordId: recordId});
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
		let { record } = props;
		let	isPremium = record.data.isPremium;

		let age = _.has(record.reportData,'dobs[0].age') ? record.reportData.dobs[0].age : null;
		let birthday = _.has(record.reportData,'dobs[0].date') ? record.reportData.dobs[0].date : null;

		age = _.isNull(age) || age >= 0 ? this.calculateAge(birthday) : null;

		let location = `${record.reportData.locations[0].address.city}, ${record.reportData.locations[0].address.state_code}`;

		return (
			<main>
				<Header title={record.reportData.names[0].first} backButton />

				<ReportHeader
					name={record.reportData.names[0].display}
					age={age}
					birthday={birthday}
					location={location}
				/>

				<PersonalSection
					nameTitle='Name'
					aliasTitle='Aliases'
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
				/>

				{/*               Premium Sections           */}
				{ isPremium ?
					<div>
						{ _.isEmpty(record.reportData.associates) ? null :
							<Associates
								associates={record.reportData.associates}
							/>
						}

						{ _.isEmpty(record.reportData.relationships) ? null :
							<Relationships
								relationships={record.reportData.relationships}
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
					isPremium={isPremium}
				/>

				{ !_.isEmpty(record.reportData.criminal_records) ?
					<CriminalRecordsSection
						crimes={record.reportData.criminal_records}
					/> : null
				}

				{ !_.isEmpty(record.reportData.sources) ?
					<SocialSection
						accounts={record.reportData.sources}
						links={record.reportData.urls}
					/> : null
				}

				<LicensesSection
					name={record.reportData.names[0].display}
					faa_licenses={record.reportData.faa_licenses}
					controlled_substances={record.reportData.controlled_substances}
					hunting_fishing_licenses={record.reportData.hunting_fishing_licenses}
					professional_licenses={record.reportData.professional_licenses}
					weapon_permits={record.reportData.weapon_permits}
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

						{ _.isEmpty(record.reportData.watercrafts) ? null :
							<Watercrafts
								watercrafts={record.reportData.watercrafts}
							/>
						}
					</div>
				: null }

				{ isPremium !== true ?
					<button onTouchTap={ () => { this.popupPremiumUpsell(); } } className='btn-link'>
			            UPGRADEEEEEEEEEEEEEE!
			        </button> : null
				}
				{ (isPremium !== true && this.state.premiumModal) ?
						<PremiumUpsellPrompt 
							confirmUpsell = {() => { this.confirmUpsell(this.state.recordId); } } 
							cancelUpsell = {() => { this.cancelUpsell(); } } 
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

export default PersonRecord;
