import React, { Component } from 'react';

const PhotoGallery = (props) => {
	if (props.photos !== '') {
		return (
			<div className="photo-gallery">
				<h3>Photos:</h3>
				{props.photos.map((photo, i) => (
					<img key={i} src={photo}></img>
				))}
			</div>
		);
	} else {
		return null;
	}
}

export default PhotoGallery;
