import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import SearchForm from './SearchForm';
import ResultsList from './ResultsList';

export default class Search extends Component {
	render() {
		let search = this.props.appState.search;
		
		if(search.searching) {
			return (
				<div>
					<SearchForm firstName={search.criteria.firstName} lastName={search.criteria.lastName} state={search.criteria.state} />
					<p>
						We are currently searching for {search.criteria.firstName} {search.criteria.lastName} in {search.criteria.state}
					</p>
				</div>
			);
		}

		return (
			<div>
				{search.gettingRecord ? <p>We are redirecting to your report</p> : null}
				<SearchForm firstName={search.criteria.firstName} lastName={search.criteria.lastName} state={search.criteria.state} />
				{search.results.length ? <ResultsList results={search.results} /> : null}
			</div>
		);
	}
};

var styles = {

};
