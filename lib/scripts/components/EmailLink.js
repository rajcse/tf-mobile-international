import React from 'react';
import viewActions from '../actions/viewActions';
import classNames from 'classnames';

export default class EmailLink extends React.Component {
	constructor(props) {
		super(props);

		this.selectEmail = this.selectEmail.bind(this);
	}

	selectEmail(e) {
		// Redundant, but also future proof if onClick can be removed
		e.preventDefault();
		viewActions.selectEmail(this.props.address);
	}

	render() {
		let { children, classes } = this.props;
		return (
			<a className={classNames('email-link', classes)} onClick={this.selectEmail} >
				{children}
			</a>
		);
	}
}

EmailLink.propTypes = {
	children: React.PropTypes.any,
	classes: React.PropTypes.string,
	address: React.PropTypes.string.isRequired
};
