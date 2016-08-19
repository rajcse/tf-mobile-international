import React, { Component } from 'react';
import Header from '../shared/Header';

class OffenderModal extends Component {
	render() {
		let { closeOffender } = this.props;

		return (
			<main>
				<Header title="Sex Offender" buttonHandler={closeOffender} backButton />
			</main>
		);
	}
}

OffenderModal.propTypes = {
	closeOffender: React.PropTypes.func.isRequired
}

export default OffenderModal;
