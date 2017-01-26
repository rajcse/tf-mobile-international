import React, { Component } from 'react';
import { Link } from 'react-router';
import Transition from 'components/Transition';
import viewActions from 'actions/viewActions';
import Loader from 'components/Loader';
import Svg from 'components/svg/Svg';
import Carousel from 'components/Carousel';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email : '',
			password: '',
			isVisible: false,
			onboarding: [{
				title: 'Unlimited Search',
				content: 'Search People, Phone Numbers, and Email Addresses'
			}, {
				title: 'Simple Design',
				content: 'This app makes searching and navigation effortless.'
			}, {
				title: 'Brace Yourself',
				content: 'Uncover pictures, criminal records, social profiles, and more!'
			}]
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleLogin = this.toggleLogin.bind(this);
		this.focusOnForm = this.focusOnForm.bind(this);
	}

	componentDidMount() {
		// Handle some app status bar style changes
		if(window.StatusBar && window.device && window.device.platform === 'iOS') {
			window.StatusBar.backgroundColorByHexString('#57BF93');
			window.StatusBar.styleLightContent();
		}
	}

	componentWillUnmount() {
		// Set the status bar back to normal
		if(window.StatusBar && window.device && window.device.platform === 'iOS') {
			window.StatusBar.backgroundColorByHexString('#ffffff');
			window.StatusBar.styleDefault();
		}
	}

	toggleLogin() {
		this.setState({
			isVisible: !this.state.isVisible
		});
	}

	handleSubmit(e) {
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
		document.querySelector('#login object').classList.toggle('focused');
	}

	render() {
		return (
			<div id="login">
				<Svg svg="tfLogoWhite" />

				<Carousel
					items={this.state.onboarding}
				/>

				<div className="fullscreen-bg">
					<video loop muted autoPlay poster="/img/pexels-photo-297755.jpeg" className="fullscreen-bg__video">
						<source src="/video/559533633.webm" type="video/webm" />
						<source src="/video/559533633.mp4" type="video/mp4" />
						<source src="/video/559533633.ogv" type="video/ogg" />
					</video>
				</div>


				{ this.state.isVisible ? null
					: <div className="login-actions">
						<button className="btn btn-primary">
							<Link to="/register" >Create a free account</Link>
						</button>
						<button type="button" onClick={() => this.toggleLogin()} className="btn btn-default">Log In</button>
					</div>
				}

				{ this.state.isVisible ?
					<div id="login-form">
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

							<button className="login-btn" disabled={this.props.loggingIn} type="submit" onClick={this.doLogin}>
								{this.props.loggingIn ? 'Logging In...' : 'Log In'}
							</button>
							{this.props.loggingIn ? <Loader /> : null}
						</form>
						<p id="not-a-member">
							<Link to="/register">Create a new account!</Link>
						</p>
					</div>
				: null }
			</div>
		);
	}
}

Login.propTypes = {
	loggingIn: React.PropTypes.bool,
	loginErrors: React.PropTypes.string
};
