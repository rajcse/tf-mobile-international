import React, { Component } from 'react';

const PhotoView = (props) => {
	return (
		<div className='photos row'>
			<div className='label'>
				<h4>{props.rowLabel}</h4>
			</div>

			<div className='content content-full'>
				<ul>
					{props.rowContent.map((content, i) => (
						<li key={i}>
							<img src={content} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default PhotoView;
