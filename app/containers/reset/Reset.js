import React, { Component } from 'react';
import { Link } from 'react-router';
import userStore from 'stores/userStore';
import Transition from 'components/Transition';
import viewActions from 'actions/viewActions';
import Loader from 'components/Loader';
import Svg from 'components/svg/Svg';

export default class Reset extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email : '',
			sending: userStore.isResettingPassword(),
			resetErrors: userStore.getResetPasswordErrors(),
			requestSent: false	
		};

		this.doReset = this.doReset.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.focusOnForm = this.focusOnForm.bind(this);
		this.blurOnForm = this.blurOnForm.bind(this);
		this.onUserChange = this.onUserChange.bind(this);
	}

	componentDidMount() {
		// Handle some app status bar style changes
		if(window.StatusBar && window.device && window.device.platform === 'iOS') {
			window.StatusBar.backgroundColorByHexString('#57BF93');
			window.StatusBar.styleLightContent();
		}

		userStore.addChangeListener(this.onUserChange);
	}

	componentWillUnmount() {
		// Set the status bar back to normal
		if(window.StatusBar && window.device && window.device.platform === 'iOS') {
			window.StatusBar.backgroundColorByHexString('#ffffff');
			window.StatusBar.styleDefault();
		}

		userStore.removeChangeListener(this.onUserChange);
	}

	doReset(e) {

		e.preventDefault();

		viewActions.resetPassword({
			email: this.state.email
		});

		this.setState({
			requestSent: true
		});
	}

	onUserChange() {
		this.setState({
			sending: userStore.isResettingPassword(),
			resetErrors: userStore.getResetPasswordErrors()
		});
	}

	handleChange(e) {
		let change = {};
		change[e.target.name] = e.target.value;
		this.setState(change);
	}

	focusOnForm() {
		document.querySelector('#login object').classList.add('focused');
	}

	blurOnForm() {
		document.querySelector('#login object').classList.remove('focused');
	}

	render() {
		return (
			<div id="reset">
				<Svg svg="tfLogoWhite" />
				<form onSubmit={this.doReset} onBlur={this.blurOnForm} onFocus={this.focusOnForm} className="input-fields">

					<Transition transitionName="register-error" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
						{this.state.resetErrors ? <p className="error-message">{this.state.resetErrors}</p> : null}
					</Transition>

					<label>Enter the email address associated with your account, and we’ll email you a link to reset your password.</label>
					<p>If you no longer have access to the email account you signed up with, contact our Member Care line for help restoring your TruthFinder account access: <a href="tel:18006998081">(800) 699-8081</a></p>

					<input
						type="email"
						placeholder="Email Address"
						defaultValue={this.state.email}
						name="email"
						disabled={this.state.sending}
						onChange={this.handleChange} />

					{this.state.requestSent && !this.state.resetErrors && !this.state.sending ? 
						<p>Password Reset Link Sent. Check your email for password reset link. It could take a few minutes to arrive.</p>
						: <button className="login-btn" disabled={this.state.sending} type="submit" onClick={this.doReset}>Send Reset Password Link</button>
					}
					{this.state.sending ? <Loader /> : null}
				</form>
				<p id="back">
					<Link to="/login">Back</Link>
				</p>
			</div>
		);
	}
}

Reset.propTypes = {
	reset: React.PropTypes.bool,
	resetErrors: React.PropTypes.string
};
