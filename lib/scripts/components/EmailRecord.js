import React, { Component } from 'react';
import _ from 'lodash';
import Header from './Shared/Header';

import PersonalSectionView from './Personal';
import ContactSectionView from './Contact';
import LocationSectionView from './Location';
import SocialSectionView from './Social';

const EmailRecord = (props) => {

	return (
		<main>
			<Header title={props.record.reportData.names[0].first} backButton />
			
			<PersonalSectionView
				name={props.record.reportData.names[0].display}
				gender={_.has(props.record.reportData,'gender.content') ? props.record.reportData.gender.content : null}
				aliases={props.record.reportData.names.slice(1)}

				//TODO these 3...
				birthdate={_.has(props.record.reportData,'dobs[0].date') ? props.record.reportData.dobs[0].date : null}
				zodiac={_.has(props.record.reportData,'dobs[0].zodiac') ? props.record.reportData.dobs[0].zodiac : null}

				photos={props.record.reportData.images}
				jobs={props.record.reportData.jobs}
				education={props.record.reportData.educations}
				relatives={props.record.reportData.related_persons}
			/>

			<ContactSectionView
				phones={props.record.reportData.phones}
				emails={props.record.reportData.emails}
			/>

			<LocationSectionView
				locations={props.record.reportData.locations}
			/>

			{ !_.isEmpty(props.record.reportData.sources) ?
				<SocialSectionView
					accounts={props.record.reportData.sources}
					links={props.record.reportData.urls}
				/> : null
			}

		</main>
	);
}

export default EmailRecord;
