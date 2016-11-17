import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import Login from '../app/components/login/Login';

describe('<Login />', () => {
	it('component mounts succesfully', function () {
		const wrapper = shallow(<Login/>);
		expect(wrapper.is('#login')).to.equal(true);
	});

	it('should have props for loggingIn and loginErrors', function () {
		const wrapper = shallow(<Login/>);
		expect(wrapper.props().loggingIn).to.be.defined;
		expect(wrapper.props().loginErrors).to.be.defined;
	});

	it('should update the login state on clicking fetch', function () {
		const wrapper = mount(<Login/>);
		wrapper.setState({ email: 'leianivey+prod1@thecontrolgroup.com', password: 'Kingston876' });
		wrapper.find('button').simulate('click');
		expect(wrapper.state('email')).to.equal('eianivey+prod1@thecontrolgroup.com');
		expect(wrapper.state('loggingIn')).to.equal(true);
	});
});
