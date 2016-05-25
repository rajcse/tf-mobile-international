import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';

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
	
};