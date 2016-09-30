import React from 'react';
import _ from 'lodash';
import PhotoView from '../shared/PhotoView';
import SimpleRow from '../shared/SimpleRow';
import SimpleInline from '../shared/SimpleInline';
import constants from '../../constants/pubRecConstants';

// Container Specific Component
import JobsColumn from '../shared/JobsColumn';
import EducationColumn from './education';
import RelativesColumn from './relatives';

import Sticky from 'react-stickynode';

import uuid from 'uuid';

const PersonalSection = (props) => {
	let personalNode = [],
		jobsNode = [],
		educationNode = [],
		relativesNode = [];

	let { name,
		gender,
		aliases,
		birthdate,
		photos,
		jobs,
		education,
		relatives,
		nameTitle,
		aliasTitle,
		age,
		zodiac,
		deathdate,
		calculateAge,
		birthRange
	} = props;

	personalNode.push(
		<SimpleRow
			key={'personal-' + uuid.v4()}
			title={nameTitle}
			content={name}
		/>
	);

	if(!_.isEmpty(gender)) {
		personalNode.push(
			<SimpleRow
				key={'gender-' + uuid.v4()}
				title="Gender"
				content={_.capitalize(gender)}
				icon={gender}
			/>
		);
	}

	if(!_.isEmpty(aliases)) {
		personalNode.push(
			<SimpleRow
				key={'aliases-' + uuid.v4()}
				title={aliasTitle}
				content={_.map(aliases, 'display')}
				classes="no-space aliases"
			/>
		);
	}

	if(deathdate) {
		let formattedDate;

		formattedDate = `${constants.months[deathdate.month]}, ${deathdate.day} ${deathdate.year}`;

		personalNode.push(
			<SimpleInline
				key={'inline-' + uuid.v4()}
				title={[ 'Age of Deceased', 'Date of Death' ]}
				contents={[age, formattedDate]}
			/>
		);
		if(birthdate){
			formattedDate = `${constants.months[birthdate.month]}, ${birthdate.day} ${birthdate.year}`;
			if (birthRange) {
				formattedDate = `${constants.months[birthdate.month]} ${birthdate.year}`;
			}
			personalNode.push(
				<SimpleRow
					key={'birthdate-' + uuid.v4()}
					title="Date of Birth"
					content={formattedDate}
					classes="no-space"
				/>
			);
		}
	} else if (birthdate || age){
		let formattedDate;

		if (birthdate) {
			formattedDate = `${constants.months[birthdate.month]}, ${birthdate.day} ${birthdate.year}`;
			if (birthRange) {
				formattedDate = `${constants.months[birthdate.month]} ${birthdate.year}`;
			}
		}

		if (birthRange) {
			personalNode.push(
				<SimpleInline
					key={'inline-' + uuid.v4()}
					title={[ 'Approximate Age', 'Date of Birth' ]}
					contents={[age, formattedDate]}
				/>
			);
		} else {
			personalNode.push(
				<SimpleInline
					key={'inline-' + uuid.v4()}
					title={[ 'Age', 'Date of Birth' ]}
					contents={[age, formattedDate]}
				/>
			);
		}
	}


	if(_.has(zodiac,'sign')) {
		personalNode.push(
			<SimpleRow
				key={'zodiac-' + uuid.v4()}
				title="Astrological Sign"
				content={_.capitalize(zodiac.sign)}
			/>
		);
	}

	if(!_.isEmpty(photos)) {
		personalNode.push(
			<PhotoView
				key={'photo-' + uuid.v4()}
				title="Possible Photos"
				photos={photos}
			/>
		);
	}

	if(!_.isEmpty(jobs)) {
		jobsNode = (
			<JobsColumn
				key={'jobs-' + uuid.v4()}
				title="Jobs"
				jobs={jobs}
				classes="jobs"
			/>
		);
	}

	if(!_.isEmpty(education)) {
		educationNode = (
			<EducationColumn
				key={'education-' + uuid.v4()}
				title="Education"
				education={education}
			/>
		);
	}

	if (!_.isEmpty(relatives)) {
		relativesNode = (
			<RelativesColumn
				key={'urls-' + uuid.v4()}
				title="Possible Related Persons"
				relatives={relatives}
				calculateAge={calculateAge}
			/>
		);
	}

	return(
		<article>
			<section id="personal" className="widget">
				<Sticky>
					<h2 className="title">Personal Information</h2>
				</Sticky>

				{personalNode}

				{educationNode}

				{jobsNode}

				{relativesNode}
			</section>
		</article>
	);
};

PersonalSection.propTypes = {
	name: React.PropTypes.string,
	gender: React.PropTypes.string,
	aliases: React.PropTypes.array,
	birthdate: React.PropTypes.object,
	photos: React.PropTypes.array,
	jobs: React.PropTypes.array,
	education: React.PropTypes.array,
	relatives: React.PropTypes.array,
	nameTitle: React.PropTypes.string,
	aliasTitle: React.PropTypes.string,
	age: React.PropTypes.number,
	zodiac: React.PropTypes.object,
	calculateAge: React.PropTypes.func,
	birthRange: React.PropTypes.bool
};

export default PersonalSection;
