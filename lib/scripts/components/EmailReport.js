import React, { Component } from 'react';
import _ from 'lodash';

import PersonalSectionView from './Personal';
import ContactSectionView from './Contact';
import LocationSectionView from './Location';
import SocialSectionView from './Social';

const EmailReport = (props) => {

	return (
		<main>
			<h1>Email Report</h1>
			<PersonalSectionView
				name={props.person.names[0].display}
				gender={_.has(props.person,'gender.content') ? props.person.gender.content : null}
				aliases={props.person.names.slice(1)}

				//TODO these 3...
				birthdate={_.has(props.person,'dobs[0].date') ? props.person.dobs[0].date : null}
				zodiac={_.has(props.person,'dobs[0].zodiac') ? props.person.dobs[0].zodiac : null}

				photos={props.person.images}
				jobs={props.person.jobs}
				education={props.person.educations}
				relatives={props.person.related_persons}
			/>

			<ContactSectionView
				phones={props.person.phones}
				emails={props.person.emails}
			/>

			<LocationSectionView
				locations={props.person.locations}
			/>

			{ !_.isEmpty(props.person.sources) ?
				<SocialSectionView
					accounts={props.person.sources}
					links={props.person.urls}
				/> : null
			}

		</main>
	);
}

export default EmailReport;
