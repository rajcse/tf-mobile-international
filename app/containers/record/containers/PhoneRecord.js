import React, { Component } from 'react';
import _ from 'lodash';
import Header from 'components/Header';
import Personal from '../components/Personal';
import Contact from '../components/Contact';
import Locations from '../components/Locations';
import Social from '../components/Social';
import RecordHeader from '../components/RecordHeader';
// import constants from 'constants/pubRecConstants';
// import SearchLink from 'components/SearchLink';

// Global Functions File
import * as libs from 'utils/libs';

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
					let location = _.has(reportData,'locations[0].address.city') ?
						`${reportData.locations[0].address.city}, ${reportData.locations[0].address.state_code}`
						: null;
					//let state = _.has(reportData,'locations[0].address.state') ? reportData.locations[0].address.state_code : 'ALL';

					age = libs.calculateAge(reportData.dobs[0], reportData.dods[0]);

					return (
						<div>
							<Header title={displayNumber} backButton />

							<RecordHeader
								name={(_.has(reportData,'names[0].type') && reportData.names[0].type === 'Business') ? reportData.names[0].raw : reportData.names[0].display}
								age={age.display}
								deathdate={deathYear}
								birthdate={age.birthday}
								location={location}
								photos={reportData.images}
								isPremium={isPremium}
								type="phone"
							/>

							<Personal
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

							<Contact
								phones={reportData.phones}
								emails={reportData.emails}
								current={displayNumber}
							/>

							{ _.has(reportData,'locations[0]') ?
								<Locations
									locations={reportData.locations}
									isPremium={isPremium}
								/> : null
							}

							{ !_.isEmpty(reportData.sources) ?
								<Social
									name={reportData.names[0].first}
									accounts={reportData.sources}
									links={reportData.urls}
									usernames={reportData.usernames}
								/> : null
							}

							{ /*_.get(reportData.names[0], 'first') ?
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
							: null */}
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
