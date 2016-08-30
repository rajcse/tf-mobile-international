import React, {Component} from 'react';
import _ from 'lodash';
// import $ from 'jquery';
import OwlCarousel from 'react-owl-carousel';
import config from 'config';

class PhotoView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			photoModalOpen: false,
			currentImage: 0,
			errored: false,
			photos: this.props.photos
		};

		this.openPhoto = this.openPhoto.bind(this);
		this.closePhoto = this.closePhoto.bind(this);
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
		let photos = _.remove(this.state.photos, (photo, index) => { return key !== index; });
		this.setState({
			errored: true,
			photos: photos
		});
	}

	render() {
		let { title } = this.props;
		let { photos } = this.state;

		let photoGallery = this.state.photoModalOpen ?
			<div className="photo-modal">
				<div className="photo-close">
					<i className="icon-close-round" onTouchTap={() => this.closePhoto()} />
				</div>
				<div className="photo-wrapper">
					<img src={config.API_ROOT + '/data/image/' + this.state.photos[this.state.currentImage].thumbnail_token} onTouchTap={() => this.closePhoto()} />
				</div>
				<div className="photo-controller">
					{this.state.currentImage !== 0 ? <a className="control photo-previous" onTouchTap={() => this.prevPhoto()}><i>&nbsp;</i></a> : null}
					{this.state.currentImage !== this.props.photos.length - 1 ? <a className="control photo-next" onTouchTap={() => this.nextPhoto()}><i>&nbsp;</i></a> : null}
				</div>
			</div> : null;

		return (
			<div className="simple-column row">
				{photoGallery}

				<div className="label label-full">
					{title && <h4>{title}</h4>}
				</div>

				<OwlCarousel slideSpeed={300} itemsCustom={[[0,2], [375, 3]]} navigation={false} singleItem={false} autoPlay={false} >
					{ photos.map((photo, key) => {
						return (
							<div key={key} onClick={() => this.openPhoto(key, photo.thumbnail_token)}>
								<img onError={this.handleError.bind(this, key)} width="100" src={ config.API_ROOT + '/data/image/' + photo.thumbnail_token} />
							</div>
						);
					}) }
				</OwlCarousel>
			</div>
		);
	}
}

PhotoView.propTypes = {
	title: React.PropTypes.string,
	photos: React.PropTypes.array.isRequired,
};

export default PhotoView;
