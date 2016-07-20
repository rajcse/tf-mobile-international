import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import React, { Component } from 'react';
import Link from './Link';
import pubRecAPI from '../utils/PubRecAPI';
import viewActions from '../actions/viewActions';
import reportStore from '../stores/reportStore';
import ReportLoader from './ReportLoader';
import CriminalRecordsSectionView from './Criminal';
import PersonalSectionView from './Personal';
import ContactSectionView from './Contact';
import LocationSectionView from './Location';
import SocialSectionView from './Social';
import SexOffenderSectionView from './Offender';
import LicensesSectionView from './Licenses';

export default class Report extends Component {
	constructor(props) {
		super(props);

		// Initial state should always be null, even if the report is cached
		this.state = {
			report: null
		};

		this.onReportChange = this.onReportChange.bind(this);
	}

	onReportChange() {
		this.setState({
			report: reportStore.getCurrentReport()
		});
	}

	componentWillMount() {
		reportStore.addChangeListener(this.onReportChange);

		// Initial mount should trigger a report fetch
		// This cannot be an action, so hit the DAO directly in this case
		pubRecAPI.fetchReport({recordId: this.props.params.recordId});
	}

	componentWillUnmount() {
		reportStore.removeChangeListener(this.onReportChange);
	}

	shouldComponentUpdate() {
		return true;
	}

	componentWillReceiveProps(nextProps) {
		// This listens for report changes if the component is already mounted
		// Perform the fetch early in the lifecycle, and only if the id is changed
		if (nextProps.params.recordId !== this.props.params.recordId) {
			viewActions.fetchReport({recordId: nextProps.params.recordId});
		}
	}

	render() {
		if(!this.state.report) {
			return (
				<ReportLoader />
			);
		}

		return (
			<div id="report">
				<PersonReport person={this.state.report} />
			</div>
		)
	}
};

const PersonReport = (props) => {

	let person = props.person,
		isPremium = props.person.reportMeta.isPremium,
		name = person.names[0],
		gender = person.gender,
		education = person.educations,
		birthInfo = person.dobs,
		emails = person.emails,
		photos = person.images,
		jobs = person.jobs,
		relatedPerson = person.related_persons,
		relatedLinks = person.urls,
		phones = person.phones,
		locations = person.locations,
		criminalRecords = person.criminal_records,
		sexOffenders = person.sex_offenders,
		socialProfiles = person.sources,
		aliases = person.names.slice(1);

	locations = _.map(locations, function(currentObject) {
		return _.pick(currentObject, 'address', '@search_pointer', 'sex_offenders_count');
	});

	emails = _.map(emails, function(currentObject) {
		return _.pick(currentObject, 'address');
	});

	jobs = _.map(jobs, function(currentObject) {
		return _.pick(currentObject, 'display', 'industry', 'title', 'organization', 'date_range');
	});

	relatedLinks = _.map(relatedLinks, function(currentObject) {
		return _.pick(currentObject, 'name', 'url');
	});

	phones = _.map(phones, function(currentObject) {
		return _.pick(currentObject, 'display', 'carrier', 'line_type');
	});

	//TODO USE IMAGE TOKENS INSTEAD OF URLS
	photos = _.map(photos, function(currentObject) {
		return _.pick(currentObject, 'thumbnail_token');
	});

	photos = _.map(photos, 'thumbnail_token');


	education = _.map(education, function(currentObject) {
		return _.pick(currentObject, 'school', 'degree');
	});

	aliases = _.map(aliases, function(currentObject) {
		return _.pick(currentObject, 'display');
	});

	aliases = _.map(aliases, 'display');

	emails = _.map(emails, 'address');

	let names = [_.pick(name, 'first', 'middle', 'last')];

	birthInfo = _.map(birthInfo, function(currentObject) {
		return _.pick(currentObject, 'age', 'date', 'zodiac');
	});

	birthInfo = [_.map(birthInfo[0], function(value, key){
		if(key == 'zodiac'){
			return value.sign;
		} else if (key == 'date' && _.has(value,'month')) {
			return constants.months[value.month] + ', ' + value.day + ' ' + value.year;
		} else {
			return value;
		}
	})];

	gender = _.pick(gender, 'content');

	return (
		<main>
			<h1>Report Data</h1>

			<PersonalSectionView
				name={name.display}
				gender={gender.content}
				aliases={aliases}
				age={birthInfo}
				photos={photos}
				jobs={jobs}
				links={relatedLinks}
				education={education}
				relatives={relatedPerson}
			/>

			<ContactSectionView
				phones={phones}
				emails={emails}
			/>

			<LocationSectionView
				locations={locations}
			/>

			{ !_.isEmpty(criminalRecords) ?
				<CriminalRecordsSectionView
					crimes={criminalRecords}
				/> : null
			}

			{ !_.isEmpty(socialProfiles) ?
				<SocialSectionView
					accounts={socialProfiles}
				/> : null
			}

			<SexOffenderSectionView
				sources={sexOffenders}
			/>
			<LicensesSectionView
				faa_licenses={person.faa_licenses}
				controlled_substances={person.controlled_substances}
				hunting_fishing_licenses={person.hunting_fishing_licenses}
				professional_licenses={person.professional_licenses}
				weapon_permits={person.weapon_permits}
			/>
		</main>
	);
}
