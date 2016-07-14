import React, { Component } from 'react';
import LabelValue from '../Shared/LabelValue';
import TableView from '../Shared/TableView';
import SingleColumnRow from '../Shared/SingleColumnRow';
import PhotoView from '../Shared/PhotoView';
import SimpleRow from '../Shared/SimpleRow';

// Container Specific Component
import JobsColumn from '../Shared/JobsColumn';
import EducationColumn from './education';
import RelativesColumn from './relatives';

import uuid from 'uuid';

const PersonalSectionView = (props) => {
	let content = [];

	let { name,
		gender,
		aliases,
		birthInfo,
		photos,
		jobs,
		education,
		relatedLinks,
		relatives
	} = props;

	let jobsNode,
		educationNode,
		relativesNode;

	content.push(
		<SimpleRow
			key={'personal-' + uuid.v1()}
			title='Name'
			content={name}
		/>
	);

	if(!_.isEmpty(gender)) {
		content.push(
			<SimpleRow
				key={'gender-' + uuid.v1()}
				title='Gender'
				content={_.capitalize(gender)}
				icon={gender}
			/>
		)
	}

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
		jobsNode = <section id='jobs' className='widget'>
			<JobsColumn
				key={'jobs-' + uuid.v1()}
				title='Jobs'
				jobs={jobs}
				classes='jobs'
			/>
		</section>
	}

	if(!_.isEmpty(education)) {
		educationNode = <section id='education' className='widget'>
			<EducationColumn
				key={'education-' + uuid.v1()}
				title='Education'
				education={education}
			/>
		</section>
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

	if (!_.isEmpty(relatives)) {
		relativesNode = <section id='relatives' className='widget'>
			<RelativesColumn
				key={'urls-' + uuid.v1()}
				title='Possible Related Persons'
				relatives={relatives}
			/>
		</section>
	}

	return(
		<article>
			<section id='personal' className='widget'>
				<h2 className='title'>Personal Information</h2>
				{content}
			</section>

			{educationNode}

			{jobsNode}

			{relativesNode}
		</article>
	);
}

export default PersonalSectionView;
