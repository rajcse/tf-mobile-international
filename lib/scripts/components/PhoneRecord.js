import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import Header from './shared/Header';
import PersonalSectionView from './Personal';
import ContactSectionView from './Contact';
import LocationSectionView from './Location';
import SocialSectionView from './Social';
import ReportHeader from './shared/ReportHeader';

class PhoneRecord extends Component {
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
		let props = this.props;
		let { record } = props;
		let displayNumber = record.reportData[0].phones[0].display;
		let	isPremium = record.data.isPremium;

		return (
			<main>
				{ record.reportData.map((reportData) => {
					if(_.has(reportData,'names[0]')) {
					let age = _.has(reportData,'dobs[0].age') ? reportData.dobs[0].age : null;
					let birthday = _.has(reportData,'dobs[0].date') ? reportData.dobs[0].date : null;

					age = _.isNull(age) || age >= 0 ? this.calculateAge(birthday) : null;

					let location = !_.isEmpty(reportData.locations) ? `${reportData.locations[0].address.city}, ${reportData.locations[0].address.state_code}` : null;

					return (
						<div>
							<Header title={displayNumber} backButton />

							<ReportHeader
								name={(_.has(reportData,'names[0].type') && reportData.names[0].type === 'Business') ? reportData.names[0].raw : reportData.names[0].display}
								birthday={birthday}
								location={location}
								age={age}
								photo={!_.isNull(reportData.images) ? reportData.images[0] : null}
								isPremium={isPremium}
								type="phone"
							/>

							<PersonalSectionView
								nameTitle="Possible Owner"
								aliasTitle="Aliases"
								name={(_.has(reportData,'names[0].type') && reportData.names[0].type === 'Business') ? reportData.names[0].raw : reportData.names[0].display}
								gender={_.has(reportData,'gender.content') ? reportData.gender.content : null}
								aliases={reportData.names.slice(1)}
								birthdate={_.has(reportData,'dobs[0].date') ? reportData.dobs[0].date : null}
								age={_.has(reportData,'dobs[0].age') ? reportData.dobs[0].age : null}
								zodiac={_.has(reportData,'dobs[0].zodiac') ? reportData.dobs[0].zodiac : null}
								photos={reportData.images}
								jobs={reportData.jobs}
								education={reportData.educations}
								relatives={reportData.related_persons}
							/>

							<ContactSectionView
								phones={reportData.phones}
								emails={reportData.emails}
							/>

							{ _.has(reportData,'locations[0]') ?
								<LocationSectionView
									locations={reportData.locations}
									isPremium={isPremium}
								/> : null
							}

							{ !_.isEmpty(reportData.sources) ?
								<SocialSectionView
									name={reportData.names[0].first}
									accounts={reportData.sources}
									links={reportData.urls}
									usernames={reportData.usernames}
								/> : null
							}
						</div>
					);
				}}
			)}
			</main>
		);
	}
}

PhoneRecord.propTypes = {
	record: React.PropTypes.object.isRequired
};

export default PhoneRecord;
