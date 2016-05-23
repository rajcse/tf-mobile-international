'use strict';

import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import tfActions from '../actions/tfActions';
import PersonRow from './PersonRow';

export default class ResultsList extends Component {

	render() {
		var resultsRows = this.props.results.map(function(result){
				return <PersonRow {...result} />
			}, this);

		return (
			<ul id="results">
				{resultsRows}
			</ul>
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