'use strict';

import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import tfActions from '../actions/tfActions';
import resultsStore from '../stores/resultsStore';
import SearchForm from './SearchForm';
import ResultsList from './ResultsList';

export default class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			results: null,
			loaded: false,
			searching: false,
			criteria: {
				firstName: '',
				lastName: '',
				state: 'ALL'
			}
		};

		this.onChange = () => {			
			this.setState({
				results: resultsStore.getAllResults(),
				loaded: resultsStore.isLoaded(),
				searching: resultsStore.isSearching(),
				criteria: resultsStore.getCriteria()
			});
		}
	}

	componentDidMount() {
		resultsStore.addChangeListener(this.onChange);
	}

	componentWillUnmount() {
		resultsStore.removeChangeListener(this.onChange);
	}
	

	render() {
		if(!this.state.loaded && this.state.searching) {
			return (
				<div style={styles.page}>
					<SearchForm firstName={this.state.criteria.firstName} lastName={this.state.criteria.lastName} />
					<div style={styles.container}>
						We are currently searching for {this.state.criteria.firstName} {this.state.criteria.lastName}
					</div>
				</div>
			);
		} else if(!this.state.loaded) {
			return (
				<div style={styles.page}>
					<SearchForm firstName={this.state.criteria.firstName} lastName={this.state.criteria.lastName} />
				</div>
			);
		}

		return (
			<div style={styles.container}>	
				<SearchForm firstName={this.state.criteria.firstName} lastName={this.state.criteria.lastName} />
				<ResultsList results={this.state.results} />
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