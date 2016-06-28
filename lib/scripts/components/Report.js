import config from '../config.js';
import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import React, { Component } from 'react';
import {Link} from 'react-router';
import pubRecAPI from '../utils/PubRecAPI';
import viewActions from '../actions/viewActions';
import reportStore from '../stores/reportStore';
import ReportLoader from './ReportLoader';

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
		reportSections = [];

	reportSections.push(<PersonalSection key={'report-section-' + Math.ceil(Math.random()*10000)} person={person} />);

	return (
		<div>
			<h1>Report Data</h1>
			{reportSections}
		</div>
	);
}

const PersonalSection = (props) => {
	let person = props.person,
		name = person.names[0],
		educations = person.educations,
		birthInfo = person.dobs,
		emails = person.emails,
		photos = person.images,
		jobs = person.jobs,
		relatedLinks = person.urls,
		phones = person.phones,
		locations = person.locations,
		criminalRecords = person.criminal_records,
		sexOffenders = person.sex_offenders,
		socialProfiles = person.socialProfiles, 

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


	educations = _.map(educations, function(currentObject) {
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
			<section id="personal">
				<h3>Personal Data</h3>
				{/*JSON.stringify(locations)}
				{/*JSON.stringify(birthInfo)}
				{/*JSON.stringify(birthInfo)*/}

				<PersonalSectionRow rowLabel="Name" key={'name-' + Math.ceil(Math.random()*100000)} rowContent={`${name.first} ${name.middle} ${name.last}`} />

				<SectionRowSeparator />

				<PersonalSectionRowSingleColumn rowLabel="Alias" key={'alias-' + Math.ceil(Math.random()*100000)} rowContent={aliases} />

				<SectionRowSeparator />

				<TableView key={'age-' + Math.ceil(Math.random()*100000)} tableHeaders={['Age', 'Birthday', 'Astrological Sign']} tableRows={birthInfo}/>

				<SectionRowSeparator />

				<PersonalSectionPhotos key={'photos-' + Math.ceil(Math.random()*100000)} rowLabel="Possible Photos" rowContent={photos}/>

				<SectionRowSeparator />

				<PersonalSectionRowSingleColumn rowLabel="Email Addresses" key={'emails-' + Math.ceil(Math.random()*100000)} rowContent={emails} />

				<SectionRowSeparator />

			</section>

			<section id="contact">


				<h2>Education:</h2>

				<TableView key={'educations-' + Math.ceil(Math.random()*100000)} tableHeaders={['School', 'Degree']} tableRows={educations}/>

				<PersonalSectionRowSingleColumn rowLabel="Jobs" key={'jobs-' + Math.ceil(Math.random()*100000)} rowContent={jobs} />

				<h2>Related Links:</h2>

				<TableView key={'urls-' + Math.ceil(Math.random()*100000)} tableHeaders={['Name', 'Url']} tableRows={relatedLinks}/>
	 
				<h2>Possible Phone Numbers:</h2>

				<TableView key={'phones-' + Math.ceil(Math.random()*100000)} tableHeaders={['Carrier', 'Line Type', "Number"]} tableRows={phones}/>

			</section>

			<section id="location">


				<h2>Locations:</h2>

				<MultipleDivView rowLabel="locations" key={'locations-' + Math.ceil(Math.random()*100000)} data={locations} />


			</section>

			<section id="criminal">

				<h2>Criminal Records:</h2>

				<CriminalRecordsView rowLabel="criminal" key={'criminal-' + Math.ceil(Math.random()*100000)} data={criminalRecords} />

			</section>

			<section id="social">
				<h2>Social Profiles:</h2>
					<SocialView rowLabel="social" key={'social-' + Math.ceil(Math.random()*100000)} data={socialProfiles} />

			</section>

			<section id="offender">
				<h2>Sex Offender Information:</h2>
					<SexOffenderView rowLabel="offenders" key={'offenders-' + Math.ceil(Math.random()*100000)} data={sexOffenders} />

			</section>
		</main>
	);
}

const PersonalSectionRow = (props) => {
	return (
		<div>
			<p>
				{props.rowLabel}: {props.rowContent}
			</p>
		</div>
	);
}

const PersonalSectionRowSingleColumn = (props) => {
	return (
		<div><h2>{props.rowLabel}:</h2>
			<p>
				{props.rowContent.map(content => (<div> {content} </div>))}
			</p>
		</div>
	);
}


const PersonalSectionPhotos = (props) => {
	return (
		<div><h2>{props.rowLabel}:</h2>
			{props.rowContent.map(content => (<img src={content}></img>))}
		</div>
	);
}

const SectionRowSeparator = (props) => {
	return (
		<hr/>
	);
}


const TableView = (props) => {
	return (
		<div>
			<table style={styles.table}>
				<thead>
					<tr>
						{props.tableHeaders.map(tableHeader => <th key={'tableHeader-' + Math.ceil(Math.random()*100000)} style={styles.th}> {tableHeader} </th>)}
					</tr>
				</thead>
				<tbody>
					{props.tableRows.map(tableRow => <TableRow key={'tableRow-' + Math.ceil(Math.random()*100000)} columns={_.values(tableRow)} />)}
				</tbody>
			</table>
		</div>
	);
}

const MultipleDivView = (props) => {
	return (
		<div>
			{ props.data.map(content => <ArrayDivView key={'div-' + Math.ceil(Math.random()*100000)} data= {_.pick(content.address, "display", "is_deliverable", "usage", "is_receiving_mail")} />) }
		</div>
	);
}

const CriminalRecordsView = (props) => {
	return (
		<div>
			{ props.data.map(content => <CriminalDivView key={'div-' + Math.ceil(Math.random()*100000)} data= {_.pick(content, "matching_fields", "offender_id", "case_number", "case_filing_date", "name", "dob", "address", "offenses", "county_of_origin")} />) }
		</div>
	);
}

const ArrayDivView = (props) => {
	
	let result = [];
	let temp = props.data;

	for(let i in temp) {
	    result.push(<ObjectRow label={i} value={temp[i]} />);
	 }

	return (<div>{result}</div>)
}


const CriminalDivView = (props) => {
	
	let result = [];
	let case_filing_date = props.data.case_filing_date;
	
    result.push(<div>Match Rating based on:  {JSON.stringify(props.data.matching_fields)} </div>);

    result.push(<ObjectRow label='Name' value={props.data.name.display} />);
    result.push(<ObjectRow label='Case Number' value={props.data.case_number} />);

    if(_.has(case_filing_date, 'month')){
		case_filing_date = constants.months[case_filing_date.month] + ', ' + case_filing_date.day + ' ' + case_filing_date.year;
	    result.push(<ObjectRow label='Case Filing Date' value={case_filing_date} />);
	}

    result.push(<ObjectRow label='Location/County' value={props.data.county_of_origin} />);


/*

    result.push(<ObjectRow label={i} value={temp[i]} />);


	for(let i in temp) {
	    result.push(<ObjectRow label={i} value={temp[i]} />);
	 }
*/
	return (<div>{result}</div>)
}


const ObjectRow = (props) => {
	return (
		<div>
			<div>
				<p>
					{props.label}:
				</p>
			</div>
			<div>
				<p>
					{props.value}
				</p>
			</div>
		</div>
	);
}

const TableRow = (props) => {
	return (
		<tr>
			{props.columns.map(tableColumn => <td style={styles.td}>{JSON.stringify(tableColumn)}</td>)}
		</tr>
	);
}

const TableRow2 = (props) => {
	return (
		<tr>
			{JSON.stringify(props.columns)}
		</tr>
	);
}


var styles = {
	personalSection: {

		
	},
	table: {
		   border: '1px solid black'
	}
	,
	td: {
		   border: '1px solid black'
	}
	,
	th: {
		   border: '1px solid black'
	}
};
