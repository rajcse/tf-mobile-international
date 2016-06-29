import React, { Component } from 'react';
import SimpleList from './SimpleList';
import ObjectRow from './ObjectRow';
import PhotoGallery from './PhotoGallery';

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

		    		<SimpleList label='Usernames' key={'rows-' + Math.ceil(Math.random()*100000)} values={_.has(props.data, 'usernames') ?  _.map(props.data.usernames, 'content') : ''}  />
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