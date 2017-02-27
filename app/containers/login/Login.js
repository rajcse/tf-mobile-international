import React, { Component } from 'react';
import { Link } from 'react-router';
import Transition from 'components/Transition';
import viewActions from 'actions/viewActions';
import Loader from 'components/Loader';
import Svg from 'components/svg/Svg';
import userStore from 'stores/userStore';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email : '',
			password: '',
			loggingIn: userStore.isLoggingIn(),
			loginErrors: userStore.getLoginErrors()
		};

		this.doLogin = this.doLogin.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.focusOnForm = this.focusOnForm.bind(this);
		this.blurOnForm = this.blurOnForm.bind(this);
		this.onUserChange = this.onUserChange.bind(this);

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
			loggingIn: userStore.isLoggingIn(),
			loginErrors: userStore.getLoginErrors()
		});
	}


	doLogin(e) {
		e.preventDefault();

		viewActions.login({
			email: this.state.email,
			password: this.state.password
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
			<div id="login">
				<Svg svg="tfLogoWhite" />
				<form onSubmit={this.doLogin} onBlur={this.blurOnForm} onFocus={this.focusOnForm} className="input-fields">
					<Transition transitionName="login-error" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
						{this.state.loginErrors ? <p className="error-message">{this.state.loginErrors}</p> : null}
					</Transition>

					<label>Log In</label>

					<input
						type="email"
						placeholder="Email Address"
						defaultValue={this.state.email}
						name="email"
						disabled={this.state.loggingIn}
						onChange={this.handleChange} />

					<input
						type="password"
						placeholder="Password"
						defaultValue={this.state.password}
						name="password"
						disabled={this.state.loggingIn}
						onChange={this.handleChange} />

					<button className="login-btn" disabled={this.state.loggingIn} type="submit" onClick={this.doLogin}>
						{this.state.loggingIn ? 'Logging In...' : 'Log In'}
					</button>
					{this.state.loggingIn ? <Loader /> : null}
				</form>
				<p id="not-a-member">
					<Link to="/">Create a new account!</Link>
				</p>
				<p id="not-a-member">
					<Link to="/reset">Forgot my password?</Link>
				</p>
			</div>
		);
	}
}

Login.propTypes = {
	loggingIn: React.PropTypes.bool,
	loginErrors: React.PropTypes.string
};
