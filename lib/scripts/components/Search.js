import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import SearchForm from './SearchForm';
import ResultsList from './ResultsList';
import Loader from './Loader';

export default class Search extends Component {
	render() {
		let search = this.props.appState.search;
		
		if(search.searching) {
			return (
				<div>
					<SearchForm criteria={search.criteria} />
					<Loader />
					<p>
						Searching 
					</p>
				</div>
			);
		}

		return (
			<div>
				{search.gettingRecord ? <p>We are redirecting to your report</p> : null}
				<SearchForm criteria={search.criteria} />
				{search.results.length ? <ResultsList results={search.results} criteria={search.criteria} /> : null}
			</div>
		);
	}
};
