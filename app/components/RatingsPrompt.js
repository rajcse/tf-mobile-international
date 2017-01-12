import React, { Component, PropTypes } from 'react';
import viewActions from 'actions/viewActions';
import firebaseClient from 'utils/firebaseClient';

export default class RatingsPrompt extends Component {
	constructor(props) {
		super(props);

		this.state = {
			initialModal: true,
			message2: false
		};

		this.handlePositiveResponse = this.handlePositiveResponse.bind(this);
		this.handleNegativeResponse = this.handleNegativeResponse.bind(this);
		this.confirmAppStoreRating = this.confirmAppStoreRating.bind(this);
		this.declineAppStoreRating = this.declineAppStoreRating.bind(this);
	}

	componentWillMount() {
		firebaseClient.getConfigValue('rating_text')
			.then(ratingText => {
				this.setState({message2: ratingText});
			});
	}

	handlePositiveResponse() {
		this.setState({
			initialModal: false
		});
		firebaseClient.logEvent('ratings_prompt_response', {prompt_question: this.props.message, prompt_response: 'IT\'S GREAT!'});
	}

	handleNegativeResponse() {
		// Redirect to support page
		viewActions.goToSupport();

		// Marks the user as rated
		viewActions.markUserAsRated();
		firebaseClient.logEvent('ratings_prompt_response', {prompt_question: this.props.message, prompt_response: 'I DON\'T LIKE IT'});
	}

	confirmAppStoreRating() {
		// Marks the user as rated
		viewActions.markUserAsRated();

		//REDIRECT HERE
		window.open('market://details?id=com.truthfinder.app', '_system');

		firebaseClient.logEvent('ratings_prompt_response', {prompt_question: this.state.message2, prompt_response: 'YES!'});
	}

	declineAppStoreRating() {
		// Marks the user as rated
		viewActions.markUserAsRated();

		firebaseClient.logEvent('ratings_prompt_response', {prompt_question: this.state.message2, prompt_response: 'NO'});
	}

	render() {
		if(this.state.initialModal){
			return (
				<div id="ratings-prompt">
					<div className="modal">
						<h3>Help us get better!</h3>
						<p>{this.props.message}</p>

						<div className="confirm">
							<button className="continue" onClick={this.handlePositiveResponse}>IT'S GREAT!</button>
							<button className="cancel" onClick={this.handleNegativeResponse}>I DON'T LIKE IT</button>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div id="ratings-prompt">
				<div className="modal">
					<h3>Help us get better!</h3>
					<p>{this.state.message2}</p>

					<div className="confirm">
						<button className="continue" onClick={this.confirmAppStoreRating}>YES!</button>
						<button className="cancel" onClick={this.declineAppStoreRating}>NO</button>
					</div>
				</div>
			</div>
		);
	}
}

RatingsPrompt.propTypes = {
	message: PropTypes.string.isRequired
};
