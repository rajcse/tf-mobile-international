import React from 'react';
import Header from 'components/Header';
import serverActions from 'actions/serverActions';

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

		this.renderForm = this.renderForm.bind(this);
	}

	postSlack(e) {
		e.preventDefault();

		serverActions.slackPost({
			message: this.state.message
		});

		this.setState({
			success: true,
			message: ''
		});

		setTimeout(() => {
			this.setState({
				success: false,
				message: ''
			});
		}, 5000);
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

	renderForm(success) {
	  if ( success ) {
	    return <p className="success-message"><strong>Your message is received.</strong><br /> You will be contacted shortly</p>;
	  } 

	  return (<form id="supportForm" 
		            onBlur={() => this.blurOnForm} 
		            onFocus={() => this.focusOnForm} 
		            className="input-fields">
		              <textArea
			                  type="text"
			                  placeholder="Message"
			                  name="Message"
			                  disabled={this.state.sending}
			                  onChange={this.handleChange}
			                  value={this.state.message} />

		              <button disabled={!this.state.message.length} type="submit" onClick={this.postSlack}>Send Message
	              </button>
	          </form>);
	}

	render() {

		return (
			<div id="support">
				<Header title="Member Support" />
				<h2>TruthFinder Support</h2>
				<h4>Contact Us By Email</h4>
				<p>
					If you have questions about your account or are experiencing issues, please let us know!
					Send us a brief message describing the issue and a Member Care representative will reach out to you shortly.
				</p>
				{ this.renderForm(this.state.success) }
				<h4>Contact Us By Phone:</h4>
				<p>
					If you'd like to speak with one of our Member Care representatives they will be happy to assist you 24/7. Give them a call.
				</p>
				<a href="tel:18006998081">(800) 699-8081</a>
			</div>
		);
	}
}
