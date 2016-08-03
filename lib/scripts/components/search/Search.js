import _ from 'lodash';
import React, { Component } from 'react';
import SearchForm from './SearchForm';
import ResultsList from './ResultsList';
import Loader from '../Shared/Loader';

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
				{search.gettingRecord ? <p>Going to your report...</p> : null}
				<SearchForm searching={search.searching} criteria={search.criteria} />
				{search.searching ? <Loader style={{width: 50, margin: '40px auto 0', display: 'block'}} green /> : null}
				{results}
			</div>
		);
	}
};
