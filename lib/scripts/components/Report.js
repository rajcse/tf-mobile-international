import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import {Link} from 'react-router';
import tfActions from '../actions/tfActions';
import reportStore from '../stores/reportStore';

var constants = config.constants;

export default class Report extends Component {
	constructor(props) {
		super(props);

		// Initial state should always be null, even if the report is cached
		this.state = {
			report: null,
			isLoading: false
		};

		this.onReportChange = this.onReportChange.bind(this);
	}

	onReportChange() {
		this.setState({
			report: reportStore.getCurrentReport(),
			isLoading: false
		});
	}

	componentWillMount() {
		reportStore.addChangeListener(this.onReportChange);

		// Initial mount should trigger a report fetch
		tfActions.fetchReport({reportType: this.props.params.reportType, reportId: this.props.params.reportId});
	}

	componentWillReceiveProps(nextProps) {
		// This listens for report changes if the component is already mounted
		// Perform the fetch early in the lifecycle, and only if the type and id are changed
		if (nextProps.params.reportType !== this.props.params.reportType || nextProps.params.reportId !== this.props.params.reportId) {
			// New report is loading, so set isLoading (this gets unset on the report update handler)
			this.setState({isLoading: true});
			tfActions.fetchReport({reportType: nextProps.params.reportType, reportId: nextProps.params.reportId});
		}
	}

	componentWillUnmount() {
		console.log('Report unmounted');
		reportStore.removeChangeListener(this.onReportChange);
	}

	render() {
		if(!this.state.report) {
			return (
				<div>Fetching Report ID: {this.props.params.reportId} ...</div>
			);
		}

		if(this.state.isLoading) {
			return (
				<div style={styles.loading}>
					<div style={styles.loader}>
						<div style={styles.loadingText}>
							LOADING...
						</div>
					</div>
					<PersonReport person={this.state.report} />
				</div>
			);
		}

		return (
			<div>
				<PersonReport person={this.state.report} />
			</div>
		)

	}
};

function template(str, data) {
	let newStr = str.replace(/\$\{\s?([\w.]*)\s?\}/g, (match, p1) => {

		if(p1.split('.').length > 1) {
			let nestedProp = p1.split('.'),
				nestedVal = data;

			for (let i = 0; i < nestedProp.length; i++) {
				nestedVal = nestedVal[nestedProp[i]];
			}

			return nestedVal;
		}

		return data[p1];
	});

	return newStr;
}

const PersonReport = (props) => {
	let person = props.person,
		isPremium = props.person.reportMeta.isPremium,
		reportSections = [],
		personSchema = {
			"names": {
				"sectionTitle": "Names",
				"mainContent": {
					"Name": {
						"template": "${first} ${middle} ${last}"
					}
				},
				"sectionRows": [
					{
						"Aliases": {
							"itemSeparator": ", ",
							"template": "${first} ${middle} ${last}"
						}
					}
				]
			},
			"locations": {
				"sectionTitle": "Addresses",
				"sectionRows": [
					{
						"Location": {
							"template": "${address.street}, ${address.city}, ${address.state} ${address.zip_code}"
						}
					}
				]
			}
		};

	for (var section in personSchema) {
		if (personSchema.hasOwnProperty(section)) {
			reportSections.push(<PersonSection key={section + '-' + Math.ceil(Math.random()*10000)} schema={personSchema[section]} sectionData={person[section]} />);
		}
	}

	return (
		<div>
			{person.names[0].first} {person.names[0].last} - {person.reportMeta.reportId}<br/>
			<Link to="/people/123xyz">Go to a report</Link><br/>
			<Link to="/people/adjncd">Go to a different report</Link><br/>
			<Link to={'/people/' + Date.now()}>Go to an unseen report</Link><br/>
			<h1>Report Data</h1>
			{reportSections}
		</div>
	);
}

const PersonSection = (props) => {
	let mainContentData = props.schema.mainContent ? props.sectionData.shift() : null,
		mainContent = [],
		sectionRowsData = props.schema.sectionRows ? props.sectionData : null,
		sectionRows = [];

	// Generate the main section content, if it's there
	if(mainContentData) {
		for (let row in props.schema.mainContent) {
			if (props.schema.mainContent.hasOwnProperty(row)) {
				let rowContent = template(props.schema.mainContent[row].template, mainContentData);
				mainContent.push(<PersonSectionRow rowLabel={row} key={row + '-' + Math.ceil(Math.random()*100000)} rowContent={rowContent} />)
			}
		}
	}

	// Generate the section rows content, if it's there
	if(sectionRowsData) {
		for (let j = 0; j < sectionRowsData.length; j++) {
			for (let i = 0; i < props.schema.sectionRows.length; i++) {
				for(let row in props.schema.sectionRows[i]) {
					if (props.schema.sectionRows[i].hasOwnProperty(row)) {
						let rowContent = template(props.schema.sectionRows[i][row].template, sectionRowsData[j]);
						sectionRows.push(<PersonSectionRow rowLabel={row} key={row + '-' + Math.ceil(Math.random()*100000)} rowContent={rowContent} />)
					}
				}

				sectionRows.push(<PersonSectionRowSeparator />);
			}
		}
	}

	return (
		<section className="person-section">
			<h3>{props.schema.sectionTitle}</h3>
			{mainContent}
			{sectionRows}
		</section>
	);
}

const PersonSectionRow = (props) => {
	return (
		<div>
			{props.rowLabel}: {props.rowContent}
		</div>
	);
}

const PersonSectionRowSeparator = (props) => {
	return (
		<hr/>
	);
}

var styles = {
	loading: {
		position: 'relative'
	},
	loader: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, .5)'
	},
	loadingText: {
		position: 'absolute',
		top: '50%',
		width: '100%',
		textAlign: 'center',
		textTransform: 'uppercase',
		transform: 'translateY(-50%)',
		fontSize: '20px'
	}
};
