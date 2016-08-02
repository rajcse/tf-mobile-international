import React, { Component } from 'react';
import LabelValue from '../Shared/LabelValue';
import TableView from '../Shared/TableView';
import PhotoView from '../Shared/PhotoView';
import SimpleRow from '../Shared/SimpleRow';
import constants from '../../constants/pubRecConstants';

// Container Specific Component
import JobsColumn from '../Shared/JobsColumn';
import LinksColumn from '../Shared/LinksColumn';
import EducationColumn from './education';
import RelativesColumn from './relatives';

import uuid from 'uuid';

const PersonalSectionView = (props) => {
	let content = [];

	let { name,
		gender,
		aliases,
		birthdate,
		photos,
		jobs,
		education,
		links,
		relatives,
		nameTitle,
		aliasTitle,
		age,
		zodiac
	} = props;

	let jobsNode,
		educationNode,
		relativesNode;

	content.push(
		<SimpleRow
			key={'personal-' + uuid.v1()}
			title={nameTitle}
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
			<SimpleRow
				key={'aliases-' + uuid.v1()}
				title={aliasTitle}
				content={_.map(aliases, 'display')}
				classes='no-space'
			/>
		);
	}

	if(birthdate) {
		content.push(
			<SimpleRow
				key={'birthdate-' + uuid.v1()}
				title='Birthdate'
				content={constants.months[birthdate.month] + ', ' + birthdate.day + ' ' + birthdate.year}
			/>
		);
	}

	if(age) {
		content.push(
			<SimpleRow
				key={'age-' + uuid.v1()}
				title='Age'
				content={age}
			/>
		);
	}

	if(_.has(zodiac,'sign')) {
		content.push(
			<SimpleRow
				key={'zodiac-' + uuid.v1()}
				title='Astrological Sign'
				content={_.capitalize(zodiac.sign)}
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

	if (!_.isEmpty(links)) {
		content.push(
			<LinksColumn
				key={'links-' + uuid.v1()}
				title='Related Links'
				links={links}
				classes='links'
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
