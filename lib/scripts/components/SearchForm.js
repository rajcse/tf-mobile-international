import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import viewActions from '../actions/viewActions';
import {STATES} from '../utils/states';

export default class SearchForm extends Component {
	constructor(props) {
		super(props);

		this.doSearch = this.doSearch.bind(this);
	}

	handleInputChange(e) {
		viewActions.updateSearchCriteria({field: e.target.name, value: e.target.value});
	}

	doSearch() {
		viewActions.search({firstName: this.props.firstName, lastName: this.props.lastName, state: this.props.state});
	}

	render() {
		let statesList = [];
		
		for(let state in STATES) {
			statesList.push(<option value={state}>{STATES[state]}</option>)
		}
			
		return (
			<div>
				<input
					type="text"
					placeholder="First Name"
					defaultValue={this.props.firstName}
					style={styles.textInput}
					onBlur={this.handleInputChange}
					name="firstName"
				/>

				<input
					type="text"
					placeholder="Last Name"
					defaultValue={this.props.lastName}
					style={styles.textInput}
					onBlur={this.handleInputChange}
					name="lastName"
				/>
				<select name="state" defaultValue={this.props.state} onChange={this.handleInputChange} style={styles.select}>
					{statesList}
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
		fontWeight: 'bold',
		width: '100%',
		padding: '15px 0',
		fontSize: 18
	},
	textInput: {
		height: 40,
		padding: 5,
		float: 'left',
		width: '50%'
	},
	select: {
		clear: 'both',
		width: '100%',
		height: 40
	}
};
