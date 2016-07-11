import React, { Component, PropTypes } from 'react';
import SimpleList from '../Shared/SimpleList';
import ObjectRow from '../Shared/ObjectRow';
import PhotoGallery from '../Shared/PhotoGallery';

import Svg from '../Svg';

import uuid from 'uuid';
import _ from 'lodash'

const ProfileColumn = (props) => {

	let { social } = props;

	// Social Images
	let imagesNode;

	if (!_.isEmpty(social.images)) {
		imagesNode = <div className='section-content-picture'>
			<PhotoGallery
				photos={_.map(social.images,'url')}
			/>
		</div>
	}

	// Social Tags
	let tagNode;

	if (!_.isEmpty(social.tags)) {
		tagNode = <SimpleList
			label='Tags'
			key={`rows-${uuid.v1()}`}
			values={_.map(social.tags,'content')}
			classes='tags'
		/>
	}

	// User ID
	let userNode;

	if (!_.isEmpty(social.user_ids)) {
		userNode = <SimpleList
			label='Usernames'
			key={`rows-${uuid.v1()}`}
			values={_.map(social.user_ids, 'content')}
		/>
	}

	return (
		<div className='social-section'>
			<div className='social-header'>
				<h2 className={_.toLower(social.name)}>{social.name}</h2>
			</div>

			<div className='social-content row'>
				{_.has(social, 'names[0].display') ?
					<div className='section-title label label-full'>
						<h4>Display Name</h4>
						{/*TODO: Fix Class Name for Google + */}
						<p>{social.names[0].display}</p>
					</div> : null
				}

				{/*Photos*/}
				{imagesNode}

				{/*Tags*/}
				{tagNode}

				<div className='section-list content content-full'>

					{/*User ID*/}

		    		{/*<SimpleList2 label='Jobs' values={social.jobs}  />
						{/*<SimpleList label='Tags' values={_.has(social, 'tags') ?  _.map(social.usernames, 'content') : ''}  />
		    		<SimpleList label='Origin Url' values={_.has(social, 'usernames') ?  _.map(social.usernames, 'content') : ''}  />*/}
				</div>
			</div>
		</div>
	);
}

ProfileColumn.propTypes = {
	social: PropTypes.object.isRequired
}

export default ProfileColumn;
