import React, { Component, PropTypes } from 'react';
import firebaseClient from 'utils/firebaseClient';

class FeedbackFooter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: true
		};

		this.removeFooter = this.removeFooter.bind(this);
		this.showPremiumBundle = this.showPremiumBundle.bind(this);

	}

	showPremiumBundle() {
		this.setState({visible: false});

		this.props.showPremiumBundle();
		
		firebaseClient.logEvent('premium_response', {prompt_question: 'Did you like the premium report?', prompt_response: 'YES'});

	};


	removeFooter() {
		this.setState({visible: false});

		firebaseClient.logEvent('premium_response', {prompt_question: 'Did you like the premium report?', prompt_response: 'NO'});
	};

	render() {

		return (
			this.state.visible &&
				<section id="premiumUpsell" className="widget">
					<h2 className="title" >
						Feedback
					</h2>
					<p className="intro">
						Did you enjoy your premium premium report on {this.props.record.reportData.names[0].first}?
					</p>
					
					<button onClick={this.removeFooter} className="btn btn-feedback no">No</button>
					<button onClick={this.showPremiumBundle} className="btn btn-feedback yes">Yes</button>
				</section>
		);
	};
}

export default FeedbackFooter;

FeedbackFooter.propTypes = {
	showPremiumBundle: React.PropTypes.func.isRequired
};
