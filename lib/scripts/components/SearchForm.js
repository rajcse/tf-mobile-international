import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import tfActions from '../actions/tfActions';

export default class SearchForm extends Component {
	constructor(props) {
		super(props);

		this.doSearch = this.doSearch.bind(this);
	}

	handleTextInput(e) {
		tfActions.updateSearchCriteria({field: e.target.name, value: e.target.value});
	}

	doSearch() {
		tfActions.search({firstName: this.props.firstName, lastName: this.props.lastName, state: this.props.state});
	}

	render() {
		return (
			<div>
				<input
					type="text"
					placeholder="First Name"
					defaultValue={this.props.name}
					style={styles.textInput}
					onBlur={this.handleTextInput}
					name="firstName"
				/>

				<input
					type="text"
					placeholder="Last Name"
					defaultValue={this.props.name}
					style={styles.textInput}
					onBlur={this.handleTextInput}
					name="lastName"
				/>
				<select selectedValue={this.props.state}>
					<option value="ALL">All</option>
					<option value="CA">California</option>
				</select>
				<button style={styles.button} onClick={this.doSearch}>
						Search
				</button>
			</div>
		);
	}
};

var styles = {
	button: {
		height: 44
	},
	textInput: {
		height: 40,
		padding: 5,
		margin: 5,
		boxShadow: 'none',
		borderColor: '#eee',
		backgroundColor: '#fff',
		borderRadius: 2
	}
};
