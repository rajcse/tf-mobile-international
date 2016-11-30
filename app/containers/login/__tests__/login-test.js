/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils, { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';
import { expect } from 'chai';
import Login from '../Login';

describe('Login', () => {
	const renderer = renderIntoDocument(<Login/>);
	const dom = ReactDOM.findDOMNode(renderer);

	it('should render correctly', () => {
		return expect(renderer).to.be.ok;
	});

	it('should have props for loggingIn and loginErrors', () => {
		expect(renderer.props.loggingIn).to.be.defined;
		expect(renderer.props.loginErrors).to.be.defined;
	});

	it('should update the login state on clicking button', () => {
		renderer.setState({
			email: 'test@test.com',
			password: 'test'
		}, () => {
			expect(renderer.state.email).to.equal('test@test.com');
			expect(renderer.state.password).to.equal('test');

			let button = findRenderedDOMComponentWithClass(renderer, 'login-btn');

			window.device = {};

			TestUtils.Simulate.click(button, () => {
				expect(renderer.props.loggingIn).to.equal(true);
			});
		});
	});
});
