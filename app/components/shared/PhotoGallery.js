import React from 'react';

const PhotoGallery = (props) => {
	return (
		<div className="photo-gallery row">
			<div className="label">
				<h4>Photos</h4>
			</div>

			<div className="content content-full">
				<ul className="photos">
					{ props.photos.map((photo, i) => (
						<li>
							<img key={i} src={photo} />
						</li>
					)) }
				</ul>
			</div>
		</div>
	);
};

PhotoGallery.propTypes = {
	photos: React.PropTypes.array.isRequired
};

export default PhotoGallery;
