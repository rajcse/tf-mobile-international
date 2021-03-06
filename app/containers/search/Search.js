import React from 'react';
import Scroll from 'react-scroll';
import constants from 'constants/pubRecConstants';
import {STATES} from 'utils/states';
import Header from 'components/Header';
import Loader from 'components/Loader';
import SearchForm from './components/SearchForm';
import ResultsList from './components/ResultsList';
import _ from 'lodash';

export default class Search extends React.Component {
	componentDidUpdate() {
		// Scroll to bottom of search form when searching
		if(this.props.appState.search.searching) {
			let scroll = Scroll.animateScroll,
				form = document.getElementById('search-form'),
				scrollPos = form.offsetTop + form.offsetHeight - document.getElementsByTagName('header')[0].offsetHeight;

			scroll.scrollMore(scrollPos);
		}
	}

	render() {
		let search = this.props.appState.search,
			results = null;

		if(search.searching) {
			let searchText = '';

			if (search.criteria.type === constants.recordTypes.PERSON &&
				_.get(search,'criteria[constants.recordTypes.PERSON].lastName[0]') &&
				_.get(search,'criteria[constants.recordTypes.PERSON].firstName[0]')
			) {
				searchText = search.criteria[constants.recordTypes.PERSON].firstName[0].toUpperCase() + search.criteria[constants.recordTypes.PERSON].firstName.substring(1).toLowerCase() + ' ' +
							(search.criteria[constants.recordTypes.PERSON].middleInitial ? search.criteria[constants.recordTypes.PERSON].middleInitial.toUpperCase() + '. ' : '' ) +
							search.criteria[constants.recordTypes.PERSON].lastName[0].toUpperCase() + search.criteria[constants.recordTypes.PERSON].lastName.substring(1).toLowerCase() + ' in ' +
							STATES[search.criteria[constants.recordTypes.PERSON].state];
			} else {
				searchText = search.criteria[search.criteria.type].text;
			}

			results = (
				<div className="searching-text">
					<h5>Searching</h5>
					<p>{searchText}</p>
					<Loader />
				</div>
			);
		} else {
			// Search component should care about quantity of results, ResultsList should only care about displaying results
			if (search.results[search.criteria.type] !== null && search.results[search.criteria.type].length) {
				results = <ResultsList results={search.results} type={search.criteria.type} />;
			} else if (search.results[search.criteria.type] !== null) {
				results = (
					<div id="no-results">
						<p>No results found...</p>
					</div>
				);
			}
		}

		return (
			<div id="search">
				<Header title="Search" />
				<SearchForm searching={search.searching} criteria={search.criteria} />
				{results}
			</div>
		);
	}
}

Search.propTypes = {
	appState: React.PropTypes.object
};
