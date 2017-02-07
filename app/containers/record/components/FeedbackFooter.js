import React, { Component } from 'react';
import firebaseClient from 'utils/firebaseClient';
import viewActions from 'actions/viewActions';

class FeedbackFooter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rated: false
		};

		this.removeFooter = this.removeFooter.bind(this);
		this.showPremiumBundle = this.showPremiumBundle.bind(this);

	}

	showPremiumBundle() {
		this.setState({rated: true});

		viewActions.showPremiumBundle();
		
		firebaseClient.logEvent('premium_response', {prompt_question: 'like the premium report', prompt_response: 'YES'});

	}

	removeFooter() {
		this.setState({rated: true});

		firebaseClient.logEvent('premium_response', {prompt_question: 'like the premium report', prompt_response: 'NO'});
	}

	render() {

		return (
			!this.state.rated ?
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
				:
				<section id="premiumUpsell" className="widget">
					<h2 className="title" >
						Feedback
					</h2>
					<p className="intro">
						Thank you for your Feedback!
					</p>					
				</section>
		);
	}
}

export default FeedbackFooter;

FeedbackFooter.propTypes = {
	record: React.PropTypes.object
};
