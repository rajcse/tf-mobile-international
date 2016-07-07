import React, { Component } from 'react';

const PhotoView = (props) => {
	return (
		<div className='photos row'>
			<h4 className='label'>{props.rowLabel}</h4>
			<ul>
				{props.rowContent.map((content, i) => (
					<li key={i}>
						<img src={content} />
					</li>
				))}
			</ul>
		</div>
	);
}

export default PhotoView;
