import React from 'react';
import viewActions from 'actions/viewActions';
import classNames from 'classnames';

export default class TeaserLink extends React.Component {
	constructor(props) {
		super(props);

		this.selectTeaser = this.selectTeaser.bind(this);
	}

	selectTeaser(e) {
		// Redundant, but also future proof if onClick can be removed
		e.preventDefault();
		viewActions.selectTeaser(this.props.teaser.recordData, this.props.recordType);
	}

	render() {
		let { children, classes } = this.props;
		return (
			<a className={classNames('teaser-link', classes)} onClick={this.selectTeaser} >
				{children}
			</a>
		);
	}
}

TeaserLink.propTypes = {
	children: React.PropTypes.any,
	classes: React.PropTypes.string,
	teaser: React.PropTypes.object.isRequired,
	recordType: React.PropTypes.string.isRequired
};
