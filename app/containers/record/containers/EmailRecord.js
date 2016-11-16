import React, { Component } from 'react';
import _ from 'lodash';
import Header from 'components/Header';

// Global Functions File
import * as libs from 'utils/libs';

import Personal from '../components/Personal';
import Contact from '../components/Contact';
import Locations from '../components/Locations';
import Social from '../components/Social';
import RecordHeader from '../components/RecordHeader';
import constants from 'constants/pubRecConstants';
import SearchLink from 'components/SearchLink';

class EmailRecord extends Component {
	render() {
		let { record } = this.props,
			isPremium = record.data.isPremium,
			age = null,
			deathYear = null,
			name = '',
			location = _.has(record.reportData,'locations[0].address.city') ? `${record.reportData.locations[0].address.city}, ${record.reportData.locations[0].address.state_code}` : null,
			state = _.has(record.reportData,'locations[0].address.state') ? record.reportData.locations[0].address.state_code : 'ALL';

		age = libs.calculateAge(record.reportData.dobs[0], record.reportData.dods[0]);

		if (_.has(record.reportData, 'names[0].type') && record.reportData.names[0].type === 'Business') {
			name = record.reportData.names[0].raw;
		} else if (_.has(record.reportData, 'names[0].display')){
			name = record.reportData.names[0].display;
		}

		return (
			<main>
				<Header title={record.data.email.address} backButton />
				<RecordHeader
					name={name}
					location={location}
					age={age.display}
					deathdate={deathYear}
					birthdate={age.birthday}
					photos={record.reportData.images}
					isPremium={isPremium}
					type="email"
				/>

				<Personal
					nameTitle="Possible Owner"
					aliasTitle="Aliases"
					name={name}
					gender={_.has(record.reportData,'gender.content') ? record.reportData.gender.content : null}
					aliases={record.reportData.names.slice(1)}
					deathdate={age.deathday}
					birthdate={age.birthday}
					age={age.display}
					zodiac={_.has(record.reportData,'dobs[0].zodiac') ? record.reportData.dobs[0].zodiac : null}
					photos={record.reportData.images}
					jobs={record.reportData.jobs}
					education={record.reportData.educations}
					relatives={record.reportData.related_persons}
					calculateAge={libs.calculateAge}
				/>

				<Contact
					phones={record.reportData.phones}
					emails={record.reportData.emails}
					current={record.data.email.address}
					isPremium={isPremium}
				/>

				{ _.has(record.reportData,'locations[0]') ?
					<Locations
						locations={record.reportData.locations}
						isPremium={isPremium}
					/> : null
				}

				{ !_.isEmpty(record.reportData.sources) ?
					<Social
						name={_.has(record.reportData,'names[0].first') ? record.reportData.names[0].first : null}
						accounts={record.reportData.sources}
						links={record.reportData.urls}
						usernames={record.reportData.usernames}
						isPremium={isPremium}
					/> : null
				}
				{name ?
					<section id="crossSell" className="widget">
						<SearchLink
							criteria={{
								type: constants.recordTypes.PERSON,
								query: {
									firstName: record.reportData.names[0].first,
									lastName: record.reportData.names[0].last,
									state: state
								},
								text: record.reportData.names[0].display
							}}
							classes="btn btn-upgrade">View Person Report
						</SearchLink>
					</section>
				: null}
			</main>
		);
	}
}

EmailRecord.propTypes = {
	record: React.PropTypes.object.isRequired
};

export default EmailRecord;
