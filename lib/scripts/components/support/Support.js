import React from 'react';
import Header from '../shared/Header';
import serverActions from '../../actions/serverActions';

export default class Support extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			message : '',
			success: false
		};

		this.postSlack = this.postSlack.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.focusOnForm = this.focusOnForm.bind(this);
		this.blurOnForm = this.blurOnForm.bind(this);
	}

	postSlack(e) {
		e.preventDefault();

		serverActions.slackPost({
			message: this.state.message
		});

		this.setState({
			success: true
		});
	}

	handleChange(e) {
		let change = {};
		change['message'] = e.target.value;
		this.setState(change);
	}

	focusOnForm() {
		document.querySelector('#support').classList.add('focused');
	}

	blurOnForm() {
		document.querySelector('#support').classList.remove('focused');
	}

	render() {

		return (
			<div id="support">
				<Header title="Member Support" />
				<h2>TruthFinder Support</h2>
			    <h4>Contact Us By Email</h4>
				<p>
					If you have questions about your account or are experiencing issues, please let us know! Send us a brief message describing the issue and a Member Care representative will reach out to you shortly.
				</p>
				<form onSubmit={this.postSlack} onBlur={this.blurOnForm} onFocus={this.focusOnForm} className="input-fields">

					<textArea
						type="text"
						placeholder="Message"
						defaultValue={this.state.message}
						name="Message"
						disabled={this.state.sending}
						onChange={this.handleChange} />

					<button disabled={this.state.sending} type="submit" onClick={this.postSlack}>
						{this.state.sending ? 'Sending Message...' : 'Send Message'}
					</button>

					{this.state.success ? <div>Your message is received. You will be contacted shortly</div> : null}
				</form>
				<h4>Contact Us By Phone:</h4>
				<p>
					If you'd like to speak with one of our Member Care representatives they will be happy to assist you 24/7. Give them a call.
			    </p>
			    <a href="tel:18006998081">(800) 699-8081</a>
			</div>
		);
	}
}
