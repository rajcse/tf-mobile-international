import React, { Component } from 'react';

const PhotoView = (props) => {
	return (
		<div className='row'>
			<div className='label'>
				<h4>{props.rowLabel}</h4>
			</div>

			<div className='content content-full'>
				<ul className='photos'>
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
