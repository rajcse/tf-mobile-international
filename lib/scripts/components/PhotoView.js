import React, { Component } from 'react';

const PhotoView = (props) => {
	return (
		<div><h3>{props.rowLabel}:</h3>
			{props.rowContent.map(content => (<img src={content}></img>))}
		</div>
	);
}

export default PhotoView;