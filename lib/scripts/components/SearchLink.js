import React from 'react';
import viewActions from '../actions/viewActions';
import classNames from 'classnames';

export default class SearchLink extends React.Component {
	constructor(props) {
		super(props);

		this.goToSearch = this.goToSearch.bind(this);
	}

	goToSearch(e) {
		// Redundant, but also future proof if onClick can be removed
		e.preventDefault();

		viewActions.goToSearch(this.props.criteria);
	}

	render() {
		let { children, classes } = this.props;

		return (
			<a className={classNames('search-link', classes)} onClick={this.goToSearch} >
				{children}
			</a>
		);
	}
}

SearchLink.propTypes = {
	classes: React.PropTypes.string,
	children: React.PropTypes.any,
	criteria: React.PropTypes.shape({
		type: React.PropTypes.string.isRequired,
		query: React.PropTypes.shape({
			firstName: React.PropTypes.string,
			lastName: React.PropTypes.string,
			state: React.PropTypes.string,
			email: React.PropTypes.string,
			phone: React.PropTypes.string
		}).isRequired,
		text: React.PropTypes.string.isRequired // What goes in the search field?
	}).isRequired
};
