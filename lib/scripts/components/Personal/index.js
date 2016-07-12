import React, { Component } from 'react';
import LabelValue from '../Shared/LabelValue';
import TableView from '../Shared/TableView';
import SingleColumnRow from '../Shared/SingleColumnRow';
import PhotoView from '../Shared/PhotoView';
import SimpleRow from '../Shared/SimpleRow';

// Container Specific Component
import JobsColumn from '../Shared/JobsColumn';
import EducationColumn from './education';

import uuid from 'uuid';

const PersonalSectionView = (props) => {
	let content = [];

	let { name,
		aliases,
		birthInfo,
		photos,
		jobs,
		education,
		relatedLinks
	} = props;

	content.push(
		<SimpleRow
			key={'personal-' + uuid.v1()}
			rowLabel='Name'
			rowContent={name}
		/>
	);

	if(!_.isEmpty(aliases)) {
		content.push(
			<SingleColumnRow
				key={'aliases-' + uuid.v1()}
				rowLabel='Aliases'
				rowContent={aliases}
				classes='aliases'
			/>
		);
	}

	if(!_.isEmpty(birthInfo)) {
		content.push(
			<TableView
				key={'age-' + uuid.v1()}
				tableLabel='Birth Information'
				tableHeaders={['Age', 'Birthday', 'Astrological Sign']}
				tableRows={birthInfo}
			/>
		);
	}

	if(!_.isEmpty(photos)) {
		content.push(
			<PhotoView
				key={'photo-' + uuid.v1()}
				title='Possible Photos'
				photos={photos}
			/>
		);
	}

	if(!_.isEmpty(jobs)) {
		content.push(
			<JobsColumn
				key={'jobs-' + uuid.v1()}
				title='Jobs'
				jobs={jobs}
				classes='jobs'
			/>
		);
	}

	if(!_.isEmpty(education)) {
		content.push(
			<EducationColumn
				key={'education-' + uuid.v1()}
				title='Education'
				education={education}
			/>
		);
	}

	if (!_.isEmpty(relatedLinks)) {
		content.push(
			<TableView
				key={'urls-' + uuid.v1()}
				tableLabel='Relatives'
				tableHeaders={['Name', 'Url']}
				tableRows={relatedLinks}
			/>
		);
	}

	return(
		<section id='personal' className='widget'>
			<h2 className='title'>Personal Information</h2>
			{content}
		</section>
	);
}

export default PersonalSectionView;
