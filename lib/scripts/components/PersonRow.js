'use strict';

import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import tfActions from '../actions/tfActions';

export default class ResultsList extends Component {

	render() {
		let address = this.props.locations ? this.props.locations[0].address.display : '';

		return (
			<li>
				{this.props.names[0].first} {this.props.names[0].last} - {this.props.locations[0].address.display}
			</li>
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