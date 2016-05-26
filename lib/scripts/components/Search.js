import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import SearchForm from './SearchForm';
import ResultsList from './ResultsList';

export default class Search extends Component {
	render() {
		let search = this.props.appState.search;

		if(!search.loaded && search.searching) {
			return (
				<div>
					<SearchForm firstName={search.criteria.firstName} lastName={search.criteria.lastName} state={search.criteria.state} />
					<div style={styles.container}>
						We are currently searching for {search.criteria.firstName} {search.criteria.lastName} in {search.criteria.state}
					</div>
				</div>
			);
		} else if(!search.loaded) {
			return (
				<div>
					<SearchForm firstName={search.criteria.firstName} lastName={search.criteria.lastName} state={search.criteria.state} />
				</div>
			);
		}

		return (
			<div>
				<SearchForm firstName={search.criteria.firstName} lastName={search.criteria.lastName} state={search.criteria.state} />
				<ResultsList results={search.results} />
			</div>
		);
	}
};

var styles = {
	container: {
		flex: 1
	},
	row: {
		flexDirection: 'row',
		padding: 10,
		backgroundColor: '#fff',
	},
	status: {
		fontSize: 18,
		textAlign: 'center',
		color: 'white'
	},
	separator: {
		height: 1,
		backgroundColor: '#CCCCCC',
	}
};
