import React, { Component } from 'react';
import { Link } from 'react-router';
import userStore from 'stores/userStore';
import Transition from 'components/Transition';
import viewActions from 'actions/viewActions';
import Loader from 'components/Loader';
import Svg from 'components/svg/Svg';

export default class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fullName: '',
			email : '',
			password: '',
			confirmPassword: '',
			registering: userStore.isRegistering(),
			registerErrors: userStore.getRegisterErrors()
		};

		this.onUserChange = this.onUserChange.bind(this);
		this.doRegister = this.doRegister.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.focusOnForm = this.focusOnForm.bind(this);
		this.blurOnForm = this.blurOnForm.bind(this);
	}

	componentWillMount() {
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

	onUserChange() {
		this.setState({
			registering: userStore.isRegistering(),
			registerErrors: userStore.getRegisterErrors()
		});
	}

	doRegister(e) {
		e.preventDefault();

		let fullName = this.state.fullName.trim().split(' ').filter(val => val),
			first_name = fullName.shift(),
			last_name = fullName.join(' ');

		viewActions.register({
			first_name,
			last_name,
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		});
	}

	handleChange(e) {
		let change = {};
		change[e.target.name] = e.target.value;
		this.setState(change);
	}

	focusOnForm() {
		document.querySelector('#register object').classList.add('focused');
	}

	blurOnForm() {
		document.querySelector('#register object').classList.remove('focused');
	}

	render() {
		return (
			<div id="register">
				<Svg svg="tfLogoWhite" />
				
				<div className="fullscreen-bg">
					<video
						loop
						muted
						autoPlay
						poster="/img/pexels-photo-297755.jpeg"
						className="fullscreen-bg__video"
					>
						<source src="/video/559533633.webm" type="video/webm" />
						<source src="/video/559533633.mp4" type="video/mp4" />
						<source src="/video/559533633.ogv" type="video/ogg" />
					</video>
				</div>

				<form onSubmit={this.doRegister} onBlur={this.blurOnForm} onFocus={this.focusOnForm} className="input-fields">
					<Transition transitionName="register-error" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
						{this.state.registerErrors ? <p className="error-message">{this.state.registerErrors}</p> : null}
					</Transition>

					<label>Create A New Account</label>

					<input
						type="text"
						placeholder="Full Name"
						defaultValue={this.state.fullName}
						name="fullName"
						disabled={this.state.registering}
						onChange={this.handleChange} />

					<input
						type="email"
						placeholder="Email Address"
						defaultValue={this.state.email}
						name="email"
						disabled={this.state.registering}
						onChange={this.handleChange} />

					<input
						type="password"
						placeholder="Password"
						defaultValue={this.state.password}
						name="password"
						disabled={this.state.registering}
						onChange={this.handleChange} />

					<input
						type="password"
						placeholder="Confirm Password"
						defaultValue={this.state.password}
						name="confirmPassword"
						disabled={this.state.registering}
						onChange={this.handleChange} />

					<p className="legal-terms">
						By clicking “Sign Up", you agree to our <a href="https://www.truthfinder.com/terms-of-use">Terms of Use</a>,
						and <a href="https://www.truthfinder.com/privacy-policy">Privacy Policy</a> and agree to receive emails.
					</p>

					<button disabled={this.state.registering} type="submit" onClick={this.doRegister}>
						{this.state.registering ? 'Registering...' : 'Sign Up'}
					</button>
					{this.state.registering ? <Loader /> : null}
				</form>
				<p id="already-a-member">
					Already have an account? <Link to="/">Log In Here</Link>
				</p>
			</div>
		);
	}
}

Register.propTypes = {
};
