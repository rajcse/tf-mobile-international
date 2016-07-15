import React, {Component} from 'react';
import uuid from 'uuid';

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

		let photoGallery = this.state.photoModalOpen ?
			<div className='photo-modal'>
				<div className='photo-wrapper'>
					<img src={this.props.photos[this.state.currentImage]} onTouchTap={() => this.closePhoto()}/>
				</div>
				<div className='photo-controller'>
					{this.state.currentImage !== 0 ? <a className='control photo-previous' onTouchTap={() => this.prevPhoto()}><i>&nbsp;</i></a> : null}
					{this.state.currentImage !== this.props.photos.length - 1 ? <a className='control photo-next' onTouchTap={() => this.nextPhoto()}><i>&nbsp;</i></a> : null}
				</div>
			</div> : null;

		return (
			<div className='row'>
				{photoGallery}

				<div className='label label-full'>
					{title && <h4>{title}</h4>}
				</div>

				<div className='content content-full'>
					<ul key={`photo-${uuid.v1()}`} className='photos'>
						{photos.map((photo, key) => (
							<li key={key}>
								<img
									src={photo}
									onTouchTap={() => this.openPhoto(key, photo)}
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
