import React from 'react';
import viewActions from '../actions/viewActions';
import classNames from 'classnames';

export default class PhoneLink extends React.Component {
	constructor(props) {
		super(props);

		this.selectPhone = this.selectPhone.bind(this);
	}

	selectPhone(e) {
		// Redundant, but also future proof if onClick can be removed
		e.preventDefault();
		viewActions.selectPhone(this.props.number);
	}

	render() {
		let { children, classes } = this.props;
		return (
			<a className={classNames('phone-link', classes)} onClick={this.selectPhone} >
				{children}
			</a>
		);
	}
}

PhoneLink.propTypes = {
	children: React.PropTypes.any,
	classes: React.PropTypes.string,
	number: React.PropTypes.string.isRequired
};
