import config from '../config.js';
import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import React, { Component } from 'react';
import {Link} from 'react-router';
import viewActions from '../actions/viewActions';
import reportStore from '../stores/reportStore';

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
		viewActions.fetchReport({reportType: this.props.params.reportType, recordId: this.props.params.recordId});
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
				<div>Fetching Record ID: {this.props.params.recordId} ...</div>
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
			<p>
				{/*person.names[0].display} {/*person.names[0].last} - {person.reportMeta.recordId}<br/>
				<Link to="/people/8fa0274d-9c15-4595-9367-c8e1ab595087">Go to Joe's report</Link><br/>
				<Link to="/people/51070b95-0216-4c80-b790-887fb3e6ebf7">Go to Brian's report</Link><br/>
				<Link to={'/people/' + Date.now()}>Go to a broken/unseen report</Link>*/}
			</p>
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
		aliases = person.names.slice(1);

	educations = _.map(educations, function(currentObject) {
	    	return _.pick(currentObject, "school", "degree");
		});

	aliases = _.map(aliases, function(currentObject) {
	    	return _.pick(currentObject, "display");
		});

	aliases = _.map(aliases, 'display');

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
		<section style={styles.personalSection}>
			<h3>Personal Data</h3>
			{/*JSON.stringify(educations)*/}
			{/*JSON.stringify(birthInfo)}
			{/*JSON.stringify(birthInfo)*/}


			<PersonalSectionRow rowLabel="Name" key={'name-' + Math.ceil(Math.random()*100000)} rowContent={`${name.first} ${name.middle} ${name.last}`} />
			<PersonalSectionRowSeparator />
			{/*aliases.map(alias => (
				<PersonalSectionRowSingleColumn rowLabel="Alias" key={'alias-' + Math.ceil(Math.random()*100000)} rowContent={`${alias.first} ${alias.middle} ${alias.last}`} />
			))*/}
			<PersonalSectionRowSingleColumn rowLabel="Alias" key={'alias-' + Math.ceil(Math.random()*100000)} rowContent={aliases} />

			<PersonalSectionRowSeparator />

			{<TableView key={'name-' + Math.ceil(Math.random()*100000)} tableHeaders={['Age', 'Birthday', 'Astrological Sign']} tableRows={birthInfo}/>}

			<PersonalSectionRowSeparator />

			<TableView key={'name-' + Math.ceil(Math.random()*100000)} tableHeaders={['School', 'Degree']} tableRows={educations}/>
			{/*}
			<TableView key={'names-' + Math.ceil(Math.random()*100000)} tableHeaders={['First Name', 'Middle Name', 'Last Name']} tableRows={names}/>
			<PersonalSectionRowSeparator />*/}

		</section>
	);
}

const PersonalSectionRow = (props) => {
	return (
		<div>
			{props.rowLabel}: {props.rowContent}
		</div>
	);
}

const PersonalSectionRowSingleColumn = (props) => {
	return (
		<div>{props.rowLabel}:
			{props.rowContent.map(content => (<div> {content} </div>))}
		</div>
	);
}

const PersonalSectionRowSeparator = (props) => {
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

const TableRow = (props) => {
	return (
		<tr>
			{props.columns.map(tableColumn => <td style={styles.td}>{JSON.stringify(tableColumn)}</td>)}
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
