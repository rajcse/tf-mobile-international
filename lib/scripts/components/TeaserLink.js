import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import React from 'react';
import viewActions from '../actions/viewActions';

export default class TeaserLink extends React.Component {
	constructor(props) {
		super(props);
		
		this.selectTeaser = this.selectTeaser.bind(this);
	}
		
	selectTeaser(e) {				
		// Redundant, but also future proof if onClick can be removed
		e.preventDefault();
		
		viewActions.selectTeaser(this.props.report.recordData, this.props.reportType);
	}
	
	render() {
		return (
			<a className="teaser-link" onTouchTap={this.selectTeaser} >
				{this.props.children}
			</a>
		);
	}
};

TeaserLink.propTypes = {
	report: React.PropTypes.object.isRequired,
	reportType: React.PropTypes.string.isRequired
};
