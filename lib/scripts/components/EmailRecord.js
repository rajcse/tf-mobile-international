import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import Header from './shared/Header';

import PersonalSectionView from './Personal';
import ContactSectionView from './Contact';
import LocationSectionView from './Location';
import SocialSectionView from './Social';
import ReportHeader from './shared/ReportHeader';

class EmailRecord extends Component {
	calculateAge(date) {
		// Check if dob exist
		if (_.isNull(date) || _.isEmpty(date)) {
			return null;
		}

		// Format Date
		date = moment(`${date.month}/${date.day}/${date.year}`, 'MM/DD/YYYY');
		return moment().diff(date, 'years');
	}

	render() {
		let { record } = this.props,
			isPremium = record.data.isPremium,
			age = _.has(record.reportData,'dobs[0].age') ? record.reportData.dobs[0].age : null,
			birthday = _.has(record.reportData,'dobs[0].date') ? record.reportData.dobs[0].date : null,
			deathday = _.has(record.reportData,'dods[0].date') ? record.reportData.dods[0].date : null,
			location = !_.isEmpty(record.reportData.locations) ? `${record.reportData.locations[0].address.city}, ${record.reportData.locations[0].address.state_code}` : null;

		age = _.isNull(age) || age >= 0 ? this.calculateAge(birthday) : null;

		if (_.has(record.reportData,'dods[0]')) {
			age = this.calculateDeceasedAge(birthday, deathday);
		}

		return (
			<main>
				<Header title={record.data.email.address} backButton />
				<ReportHeader
					name={(record.reportData.names[0].type === 'Business') ? record.reportData.names[0].raw : record.reportData.names[0].display}
					birthday={birthday}
					location={location}
					deathdate={deathday}
					age={age}
					photos={record.reportData.images}
					isPremium={isPremium}
					type="email"
				/>

				<PersonalSectionView
					nameTitle="Possible Owner"
					aliasTitle="Aliases"
					name={(record.reportData.names[0].type === 'Business') ? record.reportData.names[0].raw : record.reportData.names[0].display}
					gender={_.has(record.reportData,'gender.content') ? record.reportData.gender.content : null}
					aliases={record.reportData.names.slice(1)}
					birthdate={birthday}
					age={age}
					deathdate={deathday}
					zodiac={_.has(record.reportData,'dobs[0].zodiac') ? record.reportData.dobs[0].zodiac : null}
					photos={record.reportData.images}
					jobs={record.reportData.jobs}
					education={record.reportData.educations}
					relatives={record.reportData.related_persons}
					calculateAge={this.calculateAge}
				/>

				<ContactSectionView
					phones={record.reportData.phones}
					emails={record.reportData.emails}
					current={record.data.email.address}
					isPremium={isPremium}
				/>

				{ _.has(record.reportData,'locations[0]') ?
					<LocationSectionView
						locations={record.reportData.locations}
						isPremium={isPremium}
					/> : null
				}

				{ !_.isEmpty(record.reportData.sources) ?
					<SocialSectionView
						name={record.reportData.names[0].first}
						accounts={record.reportData.sources}
						links={record.reportData.urls}
						usernames={record.reportData.usernames}
						isPremium={isPremium}
					/> : null
				}
			</main>
		);
	}
}

EmailRecord.propTypes = {
	record: React.PropTypes.object.isRequired
};

export default EmailRecord;
