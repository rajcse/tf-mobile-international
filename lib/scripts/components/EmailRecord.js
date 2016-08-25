import React, { Component } from 'react';
import _ from 'lodash';
import Header from './shared/Header';

import PersonalSectionView from './Personal';
import ContactSectionView from './Contact';
import LocationSectionView from './Location';
import SocialSectionView from './Social';
import PossibleOwner from './shared/PossibleOwner';

const EmailRecord = (props) => {

	return (
		<main>
			<Header title={props.record.data.email.address} backButton />
			<PossibleOwner
				name={(props.record.reportData.names[0].type == 'Business') ? props.record.reportData.names[0].raw : props.record.reportData.names[0].display}
				age={_.has(props.record.reportData,'dobs[0].age') ? props.record.reportData.dobs[0].age : null}
				birthday={_.has(props.record.reportData,'dobs[0].date') ? props.record.reportData.dobs[0].date : null}
				location={_.has(props.record.reportData,'locations[0].address') ? `${props.record.reportData.locations[0].address.city}, ${props.record.reportData.locations[0].address.state_code}` : null}
			/>

			<PersonalSectionView
				nameTitle='Possible Owner'
				aliasTitle='Aliases'
				name={(props.record.reportData.names[0].type == 'Business') ? props.record.reportData.names[0].raw : props.record.reportData.names[0].display}
				gender={_.has(props.record.reportData,'gender.content') ? props.record.reportData.gender.content : null}
				aliases={props.record.reportData.names.slice(1)}
				birthdate={_.has(props.record.reportData,'dobs[0].date') ? props.record.reportData.dobs[0].date : null}
				age={_.has(props.record.reportData,'dobs[0].age') ? props.record.reportData.dobs[0].age : null}
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

			{ _.has(props.record.reportData,'locations[0]') ?
				<LocationSectionView
					locations={props.record.reportData.locations}
				/> : null						
			}

			{ !_.isEmpty(props.record.reportData.sources) ?
				<SocialSectionView
					name={props.record.reportData.names[0].first}
					accounts={props.record.reportData.sources}
					links={props.record.reportData.urls}
					usernames={props.record.reportData.usernames}
				/> : null
			}

		</main>
	);
}

export default EmailRecord;
