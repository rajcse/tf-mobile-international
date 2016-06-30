import config from '../config.js';
import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import React, { Component } from 'react';
import Link from './Link';
import pubRecAPI from '../utils/PubRecAPI';
import viewActions from '../actions/viewActions';
import reportStore from '../stores/reportStore';
import ReportLoader from './ReportLoader';
import CriminalRecordsSectionView from './CriminalRecordsSectionView';
import PersonalSectionView from './PersonalSectionView';
import ContactSectionView from './ContactSectionView';
import LocationSectionView from './LocationSectionView';
import SocialSectionView from './SocialSectionView';
import SexOffenderSectionView from './SexOffenderSectionView';


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
		pubRecAPI.fetchReport({reportType: this.props.params.reportType, recordId: this.props.params.recordId});
	}
	
	componentWillUnmount() {
		reportStore.removeChangeListener(this.onReportChange);
	}
	
	shouldComponentUpdate() {
		return true;
	}

	componentWillReceiveProps(nextProps) {
		// This listens for report changes if the component is already mounted
		// Perform the fetch early in the lifecycle, and only if the type and id are changed
		if (nextProps.params.reportType !== this.props.params.reportType || nextProps.params.recordId !== this.props.params.recordId) {
			viewActions.fetchReport({reportType: nextProps.params.reportType, recordId: nextProps.params.recordId});
		}
	}

	render() {
		if(!this.state.report) {
			return (
				<ReportLoader />
			);
		}

		return (
			<div>
				<PersonReport person={this.state.report} />
			</div>
		)

	}
};

const PersonReport = (props) => {

	let person = props.person,
		isPremium = props.person.reportMeta.isPremium,
		name = person.names[0],
		education = person.educations,
		birthInfo = person.dobs,
		emails = person.emails,
		photos = person.images,
		jobs = person.jobs,
		relatedLinks = person.urls,
		phones = person.phones,
		locations = person.locations,
		criminalRecords = person.criminal_records,
		sexOffenders = person.sex_offenders,
		socialProfiles = person.sources, 

		aliases = person.names.slice(1);

	locations = _.map(locations, function(currentObject) {
	    	return _.pick(currentObject, "address", "@search_pointer");
		});


	emails = _.map(emails, function(currentObject) {
	    	return _.pick(currentObject, "address");
		});

	jobs = _.map(jobs, function(currentObject) {
	    	return _.pick(currentObject, "display");
		});

	jobs = _.map(jobs, 'display');

	relatedLinks = _.map(relatedLinks, function(currentObject) {
	    	return _.pick(currentObject, "name", "url");
		});

	phones = _.map(phones, function(currentObject) {
	    	return _.pick(currentObject, "display", "carrier", "line_type");
		});

	//TODO USE IMAGE TOKENS INSTEAD OF URLS 
	photos = _.map(photos, function(currentObject) {
	    	return _.pick(currentObject, "url");
		});

	photos = _.map(photos, 'url');


	education = _.map(education, function(currentObject) {
	    	return _.pick(currentObject, "school", "degree");
		});

	aliases = _.map(aliases, function(currentObject) {
	    	return _.pick(currentObject, "display");
		});

	aliases = _.map(aliases, 'display');

	emails = _.map(emails, 'address');

	let names = [_.pick(name, "first", "middle", "last")];

	birthInfo = _.map(birthInfo, function(currentObject) {
	    	return _.pick(currentObject, "age", "date", "zodiac");
		});

	birthInfo = [_.map(birthInfo[0], function(value, key){
	 	if(key == 'zodiac'){
		   return value.sign;
	 	} else if (key == 'date') {
		   return constants.months[value.month] + ', ' + value.day + ' ' + value.year;
	 	} else {
		   return value;
	 	}
	})];

	return (
		<main>
			<h1>Report Data</h1>

			<PersonalSectionView key={'personal-' + Math.ceil(Math.random()*100000)} name={name.display} aliases={aliases} age={birthInfo} photos={photos} jobs={jobs} links={relatedLinks} education={education} />

			<ContactSectionView key={'contact-' + Math.ceil(Math.random()*100000)} phones={phones} emails={emails} />

			<LocationSectionView key={'location-' + Math.ceil(Math.random()*100000)} data={locations} />
			
			<CriminalRecordsSectionView key={'criminal-' + Math.ceil(Math.random()*100000)} data={criminalRecords} />

			<SocialSectionView key={'social-' + Math.ceil(Math.random()*100000)} sources={socialProfiles} />

			<SexOffenderSectionView key={'offenders-' + Math.ceil(Math.random()*100000)} sources={sexOffenders} />

		</main>
	);
}
