import React, { Component, PropTypes } from 'react';

import Header from '../shared/Header';

class LocationModal extends Component {
	render() {
		let { record, closeLocation } = this.props;

		return (
			<main>
				<Header title="Location Details" buttonHandler={closeLocation} backButton />

				<div className="modal-tab">
					<ul>
						<li>Sex Offenders</li>
						<li>Crime Statistics</li>
					</ul>
				</div>
			</main>
		);
	}
}

LocationModal.propTypes = {
	record: PropTypes.object.isRequired,
	closeLocation: PropTypes.func.isRequired
};

export default LocationModal;
