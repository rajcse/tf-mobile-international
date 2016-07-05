import React, { Component } from 'react';
import SimpleList from '../Shared/SimpleList';
import ObjectRow from '../Shared/ObjectRow';
import PhotoGallery from '../Shared/PhotoGallery';

const SocialSource = (props) => {

	return (
		<div className="standard-section">
			<div className="section-header"><h2>{props.data.name}</h2></div>
			<div className="section-content">
				<div className="section-content-title">
		    		<ObjectRow label='name' key={'rows-' + Math.ceil(Math.random()*100000)} value={_.has(props.data, 'names[0].display') ? props.data.names[0].display : ''} />
				</div>

				<div className="section-content-picture">
		    		<PhotoGallery key={'photos-' + Math.ceil(Math.random()*100000)} photos={_.has(props.data,'images') ? _.map(props.data.images,'url') : ''} />
				</div>
				<div className="section-content-list">
		    		<SimpleList label='Tags' key={'rows-' + Math.ceil(Math.random()*100000)} values={_.has(props.data,'tags') ? _.map(props.data.tags,'content') : ''}  />

		    		<SimpleList label='Usernames' key={'rows-' + Math.ceil(Math.random()*100000)} values={_.has(props.data, 'user_ids') ?  _.map(props.data.user_ids, 'content') : ''}  />
		    		{/*<SimpleList2 label='Jobs' values={props.data.jobs}  />
		    		{/*<SimpleList label='Tags' values={_.has(props.data, 'tags') ?  _.map(props.data.usernames, 'content') : ''}  />
		    		<SimpleList label='Origin Url' values={_.has(props.data, 'usernames') ?  _.map(props.data.usernames, 'content') : ''}  />*/}

				</div>
				
				<div className="section-content-meta">
				</div>

			</div>

		</div>
	);
}

export default SocialSource;