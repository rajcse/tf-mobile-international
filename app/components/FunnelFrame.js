import React, { Component, PropTypes } from 'react';
import Loader from 'components/Loader';

export default class FunnelFrame extends Component {
	constructor(props) {
		super(props);

		this.iframeLoaded = false;
		this.iframeTimeout = null;
		this.handleMessage = this.handleMessage.bind(this);
		this.closeiFrame = this.closeiFrame.bind(this);
	}

	componentWillMount() {
		window.addEventListener('message', this.handleMessage, false);
	}

	componentWillUnMount() {
		window.removeEventListener('message', this.handleMessage, false);
	}

	handleMessage(message) {
		if(message.data === 'iframeSuccess') {
			clearTimeout(this.iframeTimeout);
			this.iframeLoaded = true;

			// Cause a re-render
			this.forceUpdate();
		}

		if(message.data === 'closeiFrame') {
			this.closeiFrame();
		}
	}

	closeiFrame() {
		this.iframeLoaded = false;
		this.props.onClose();
	}

	render() {
		return (
			<div>
				{!this.iframeLoaded &&
					<div className="iframeLoader">
						<Loader />
					</div>
				}
				<iframe
					name="premium-funnel"
					className="fullscreen"
					onLoad={() => {
						this.iframeTimeout = setTimeout(() => {
							if(!this.iframeLoaded) this.closeiFrame();
						}, 500);
					}}
					src={this.props.iframeSrc}
				/>
			</div>
		);
	}
}

FunnelFrame.propTypes = {
	iframeSrc: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired
};
