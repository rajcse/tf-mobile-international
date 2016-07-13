import React, {Component} from 'react';

class PhotoView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			photoModalOpen: false,
			currentImage: 0,
		};

		this.openPhoto = this.openPhoto.bind(this);
		this.closePhoto = this.closePhoto.bind(this);
	}

	openPhoto(index, photo) {
		this.setState({
			currentImage: index,
			photoModalOpen: true,
		});
	}

	closePhoto() {
		this.setState({
			photoModalOpen: false,
		});
	}

	nextPhoto() {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}

	prevPhoto() {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}

	render() {
		let { title, photos } = this.props;

		// TODO: Put Photogallery in Modal
		let photoGallery = this.state.photoModalOpen ?
		<div className='content content-full'>
			<div id='photo-wrapper' className='photo-modal'>
				<img src={this.props.photos[this.state.currentImage]} onTouchTap={() => this.closePhoto()}/>
				<div className='photo-controller'>
					{this.state.currentImage !== 0 ? <a className='control photo-previous' onTouchTap={() => this.prevPhoto()}>Prev.</a> : null}
					{this.state.currentImage !== this.props.photos.length - 1 ? <a className='control photo-next' onTouchTap={() => this.nextPhoto()}>Next</a> : null}
				</div>
			</div>
		</div> : null;

		return (
			<div className='row'>
				<div className='label label-full'>
					{title && <h4>{title}</h4>}
				</div>

				{photoGallery}

				<div className='content content-full'>
					<ul className='photos'>
						{photos.map((photo, i) => (
							<li key={i}>
								<img
									src={photo}
									onTouchTap={() => this.openPhoto(i, photo)}
								/>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}

PhotoView.propTypes = {
	title: React.PropTypes.string,
	photos: React.PropTypes.array.isRequired,
}

export default PhotoView;
