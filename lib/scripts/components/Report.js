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
		isPremium = props.person.reportMeta.isPremium;

	return (
		<main>
			<h1>Report Data</h1>

			<PersonalSectionView
				name={person.names[0].display}
				gender={_.has(person,'gender.content') ? person.gender.content : null}
				aliases={person.names.slice(1)}

				//TODO these 3...
				birthdate={_.has(person,'dobs[0].date') ? person.dobs[0].date : null}
				zodiac={_.has(person,'dobs[0].zodiac') ? person.dobs[0].zodiac : null}
				links={person.urls}

				photos={person.images}
				jobs={person.jobs}
				education={person.educations}
				relatives={person.related_persons}
			/>

			<ContactSectionView
				phones={person.phones}
				emails={person.emails}
			/>

			<LocationSectionView
				locations={person.locations}
			/>

			{ !_.isEmpty(person.criminal_records) ?
				<CriminalRecordsSectionView
					crimes={person.criminal_records}
				/> : null
			}

			{ !_.isEmpty(person.sources) ?
				<SocialSectionView
					accounts={person.sources}
				/> : null
			}

			{ !_.isEmpty(person.sex_offenders) ?
				<SexOffenderSectionView
					sources={person.sex_offenders}
				/> : null
			}

			<LicensesSectionView
				name={person.names[0].display}
				faa_licenses={person.faa_licenses}
				controlled_substances={person.controlled_substances}
				hunting_fishing_licenses={person.hunting_fishing_licenses}
				professional_licenses={person.professional_licenses}
				weapon_permits={person.weapon_permits}
			/>
		</main>
	);
}
