import _ from 'lodash';
import React, { Component } from 'react';
import Header from '../Shared/Header';
import SearchForm from './SearchForm';
import ResultsList from './ResultsList';

export default class Search extends Component {
	constructor(props) {
		super(props);		
	}
	
	render() {
		let search = this.props.appState.search,
			results = null;
		
		// Search component should care about quantity of results, ResultsList should only care about displaying results
		if (search.results[search.criteria.type] !== null && search.results[search.criteria.type].length) {
			results = <ResultsList results={search.results} criteria={search.criteria} />;
		} else if (search.results[search.criteria.type] !== null) {
			results = (
				<div id="no-results">
			    	<p>No results found</p>
			    </div>
			);
		}
		
		return (
			<div>
				<Header title="Search" />
				{search.gettingRecord ? <p>Going to your report...</p> : null}
				<SearchForm searching={search.searching} criteria={search.criteria} />
				{results}
			</div>
		);
	}
};
