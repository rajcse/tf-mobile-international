import React, { Component } from 'react';
import _ from 'lodash';
import Header from './shared/Header';
import PersonalSectionView from './Personal';
import ContactSectionView from './Contact';
import LocationSectionView from './Location';
import SocialSectionView from './Social';
import ReportHeader from './shared/ReportHeader';
import constants from '../constants/pubRecConstants';
import SearchLink from './SearchLink';

// Global Functions File
import * as libs from '../utils/libs';

class PhoneRecord extends Component {
	render() {
		let { record } = this.props,
			displayNumber = record.reportData[0].phones[0].display,
			isPremium = record.data.isPremium,
			age =  null,
			deathYear = null,
			// Only display records with names
			reports = _.filter(record.reportData, (data) => { return data.names[0]; });

		return (
			<main>
				{ reports.map((reportData) => {
					let location = _.has(reportData,'locations[0].address.city') ? `${reportData.locations[0].address.city}, ${reportData.locations[0].address.state_code}` : null,
					state = _.has(reportData,'locations[0].address.state') ? reportData.locations[0].address.state_code : 'ALL';
					age = libs.calculateAge(reportData.dobs[0], reportData.dods[0]);

					return (
						<div>
							<Header title={displayNumber} backButton />

							<ReportHeader
								name={(_.has(reportData,'names[0].type') && reportData.names[0].type === 'Business') ? reportData.names[0].raw : reportData.names[0].display}
								age={age.display}
								deathdate={deathYear}
								birthdate={age.birthday}
								location={location}
								photos={reportData.images}
								isPremium={isPremium}
								type="phone"
							/>

							<PersonalSectionView
								nameTitle="Possible Owner"
								aliasTitle="Aliases"
								name={(_.has(reportData,'names[0].type') && reportData.names[0].type === 'Business') ? reportData.names[0].raw : reportData.names[0].display}
								gender={_.has(reportData,'gender.content') ? reportData.gender.content : null}
								aliases={reportData.names.slice(1)}
								deathdate={age.deathday}
								birthdate={age.birthday}
								age={age.display}
								zodiac={_.has(reportData,'dobs[0].zodiac') ? reportData.dobs[0].zodiac : null}
								photos={reportData.images}
								jobs={reportData.jobs}
								education={reportData.educations}
								relatives={reportData.related_persons}
							/>

							<ContactSectionView
								phones={reportData.phones}
								emails={reportData.emails}
								current={displayNumber}
							/>

							{ _.has(reportData,'locations[0]') ?
								<LocationSectionView
									locations={reportData.locations}
									isPremium={isPremium}
								/> : null
							}

							{ !_isEmpty(reportData.sources) ?
								<SocialSectionView
									name={reportData.names[0].first}
									accounts={reportData.sources}
									links={reportData.urls}
									usernames={reportData.usernames}
								/> : null
							}

							<section id="crossSell" className="widget">
								<SearchLink
									criteria={{
										type: constants.recordTypes.PERSON,
										query: {
											firstName: reportData.names[0].first,
											lastName: reportData.names[0].last,
											state: state
										},
										text: reportData.names[0].display
									}}
									classes="btn btn-upgrade">View Person Report
								</SearchLink>
							</section>
						</div>
					);
				}
			)}
			</main>
		);
	}
}

PhoneRecord.propTypes = {
	record: React.PropTypes.object.isRequired
};

export default PhoneRecord;
