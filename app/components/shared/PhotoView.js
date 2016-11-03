import React, {Component} from 'react';
import _ from 'lodash';
import OwlCarousel from 'react-owl-carousel';
import Loader from '../shared/Loader';
import config from 'config';

class PhotoView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			photoModalOpen: false,
			currentImage: 0,
			errored: false,
			photos: this.props.photos,
			hidden: ''
		};

		this.openPhoto = this.openPhoto.bind(this);
		this.closePhoto = this.closePhoto.bind(this);
		this.preventClose = this.preventClose.bind(this);
		this.handleError = this.handleError.bind(this);
	}

	openPhoto(index) {
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

	preventClose(event) {
		event.stopPropagation();
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

	// Remove Photos that do no load
	handleError(key) {
		let hidden = [key, ...this.state.hidden];

		this.setState({
			errored: true,
			hidden: hidden
		});
	}

	render() {
		let { title } = this.props;
		let { photos } = this.state;

		let photoGallery = this.state.photoModalOpen ?
			<div className="photo-modal" onClick={() => this.closePhoto()}>
				<div className="photo-close" onClick={() => this.closePhoto()}>Close Photo</div>
				<div className="photo-wrapper">
					<img src={config.API_ROOT + '/data/image/' + this.state.photos[this.state.currentImage].thumbnail_token} onClick={this.preventClose}/>
					<Loader />
				</div>
				<div className="photo-controller" onClick={this.preventClose} >
					{this.state.currentImage !== 0 ? <a className="control photo-previous" onClick={() => this.prevPhoto()}><i>&nbsp;</i></a> : null}
					{this.state.currentImage !== this.props.photos.length - 1 ? <a className="control photo-next" onClick={() => this.nextPhoto()}><i>&nbsp;</i></a> : null}
				</div>
			</div> : null;

		return (
			<div className="simple-column row">
				{photoGallery}

				<div className="label label-full">
					<h4>{title} ({photos.length})</h4>
				</div>

				<p className="walkthrough-text">Tap Any Image to View Fullscreen</p>
				<OwlCarousel slideSpeed={300} itemsCustom={[[0,2.5], [375, 3]]} navigation={false} singleItem={false} autoPlay={false} >
					{ photos.map((photo, key) => {
						return !_.includes(this.state.hidden, key) ?
							<div className="img-placeholder" key={key} onClick={() => this.openPhoto(key, photo.thumbnail_token)}>
								<img onError={this.handleError.bind(this, key)} width="100" src={ config.API_ROOT + '/data/image/' + photo.thumbnail_token} />
							</div>
						: null;
					}) }
				</OwlCarousel>
			</div>
		);
	}
}

PhotoView.propTypes = {
	title: React.PropTypes.string.isRequired,
	photos: React.PropTypes.array.isRequired,
};

export default PhotoView;
