import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Header from './Shared/Header';
import PersonalSectionView from './Personal';
import ContactSectionView from './Contact';
import LocationSectionView from './Location';
import SocialSectionView from './Social';
import PossiblePhoneOwner from './shared/PossiblePhoneOwner';

const PhoneRecord = (props) => {

		return (
			<main>  
				{ props.record.reportData.map((reportData, reportIndex) => (
				<div>  
				<Header title={reportData.phones[0].display} backButton />
				<PossiblePhoneOwner
					name={reportData.names[0].display}
					age={_.has(reportData,'dobs[0].age') ? reportData.dobs[0].age : null}
					birthday={_.has(reportData,'dobs[0].date') ? reportData.dobs[0].date : null}
					location={`${reportData.locations[0].address.city}, ${reportData.locations[0].address.state_code}`}
				/>

				<PersonalSectionView
					nameTitle='Possible Owner'
					aliasTitle='Aliases'
					name={reportData.names[0].display}
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

				<LocationSectionView
					locations={reportData.locations}
				/>

				{ !_.isEmpty(reportData.sources) ?
					<SocialSectionView
						accounts={reportData.sources}
						links={reportData.urls}
					/> : null
				}
				</div>
			))}
		</main>
	
		);
	}

export default PhoneRecord;
