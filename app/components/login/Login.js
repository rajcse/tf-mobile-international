import React, { Component } from 'react';
import { Link } from 'react-router';
import Transition from 'components/shared/Transition';
import viewActions from 'actions/viewActions';
import Loader from 'components/shared/Loader';
// import Svg from 'components/svg/Svg';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email : '',
			password: ''
		};

		this.doLogin = this.doLogin.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.focusOnForm = this.focusOnForm.bind(this);
		this.blurOnForm = this.blurOnForm.bind(this);
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
				{/* <Svg svg="tfLogoWhite" /> */}
				<form onSubmit={this.doLogin} onBlur={this.blurOnForm} onFocus={this.focusOnForm} className="input-fields">
					<Transition transitionName="login-error" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
						{this.props.loginErrors ? <p className="error-message">{this.props.loginErrors}</p> : null}
					</Transition>

					<label>Log In</label>

					<input
						type="email"
						placeholder="Email Address"
						defaultValue={this.state.email}
						name="email"
						disabled={this.props.loggingIn}
						onChange={this.handleChange} />

					<input
						type="password"
						placeholder="Password"
						defaultValue={this.state.password}
						name="password"
						disabled={this.props.loggingIn}
						onChange={this.handleChange} />

					<button disabled={this.props.loggingIn} type="submit" onClick={this.doLogin}>
						{this.props.loggingIn ? 'Logging In...' : 'Log In'}
					</button>
					{this.props.loggingIn ? <Loader /> : null}
				</form>
				<p id="not-a-member">
					<Link to="/register">Create a free account!</Link>
				</p>
			</div>
		);
	}
}

Login.propTypes = {
	loggingIn: React.PropTypes.bool,
	loginErrors: React.PropTypes.string
};
