import React, { Component, PropTypes } from 'react';
import SimpleList from '../Shared/SimpleList';
import SimpleRow from '../Shared/SimpleRow';
import ObjectRow from '../Shared/ObjectRow';
import PhotoView from '../Shared/PhotoView';
import JobsColumn from '../Shared/JobsColumn';

import Svg from '../Svg';

import uuid from 'uuid';
import _ from 'lodash'

const ProfileColumn = (props) => {

	let { social } = props;

	// Social Images
	let imagesNode = !_.isEmpty(social.images) ?
		<div className='section-content-picture'>
			<PhotoView
				title='Photos'
				photos={_.map(social.images,'url')}
			/>
		</div>
	: null;

	// Social Tags
	let tagNode = !_.isEmpty(social.tags) ?
		<SimpleList
			label='Tags'
			key={`rows-${uuid.v1()}`}
			values={_.map(social.tags,'content')}
			classes='tags'
		/>
		: null;

	// User ID
	let userNode = !_.isEmpty(social.user_ids) ?
		<SimpleRow
			title='Usernames'
			key={`rows-${uuid.v1()}`}
			content={_.map(social.user_ids, 'content')}
			classes='no-space'
		/>
		: null;

	// Jobs
	let jobsNode = !_.isEmpty(social.jobs) ?
		<JobsColumn
			title='Jobs'
			key={`rows-${uuid.v1()}`}
			jobs={social.jobs}
			classes='jobs'
		/>
	: null;

	return (
		<div className='simple-column row social-section'>
			<div className='social-header'>
				<h2 className={_.toLower(social.name)}>{social.name}</h2>
			</div>

			<div className='social-content'>
				{_.has(social, 'names[0].display') ?
					<SimpleRow
						classes=''
						title='Display Name'
						content={social.names[0].display}
					/>
					: null
				}

				{/*Photos*/}
				{imagesNode}

				{/*Tags*/}
				{tagNode}

				{/*User ID*/}
				{userNode}

				{/*Jobs*/}
				{jobsNode}
			</div>
		</div>
	);
}

ProfileColumn.propTypes = {
	social: PropTypes.object.isRequired
}

export default ProfileColumn;
