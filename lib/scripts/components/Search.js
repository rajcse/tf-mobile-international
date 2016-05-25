import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import SearchForm from './SearchForm';
import ResultsList from './ResultsList';

export default class Search extends Component {
	render() {
		if(!this.props.loaded && this.props.searching) {
			return (
				<div>
					<SearchForm firstName={this.props.criteria.firstName} lastName={this.props.criteria.lastName} />
					<div style={styles.container}>
						We are currently searching for {this.props.criteria.firstName} {this.props.criteria.lastName}
					</div>
				</div>
			);
		} else if(!this.props.loaded) {
			return (
				<div>
					<SearchForm firstName={this.props.criteria.firstName} lastName={this.props.criteria.lastName} />
				</div>
			);
		}

		return (
			<div>
				<SearchForm firstName={this.props.criteria.firstName} lastName={this.props.criteria.lastName} />
				<ResultsList results={this.props.results} />
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
