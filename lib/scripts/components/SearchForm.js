import config from '../config.js';
import constants from '../constants/pubRecConstants';
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
		let query;
		
		switch(this.props.criteria.type) {
			case constants.reportTypes.PERSON:
				let fullName = this.props.criteria.text.trim().split(' ').filter(val => val),
					firstName = fullName.shift(),
					lastName = fullName.join(' ');
					
				query = {firstName: firstName, lastName: lastName, state: this.props.criteria.state};
				break;
				
			case constants.reportTypes.LOCATION:
				break;
			
			case constants.reportTypes.EMAIL:
				break;
				
			case constants.reportTypes.PHONE:
				break;
				
			default:
				break;
		}
		
		viewActions.search(query);
	}

	render() {
		switch(this.props.criteria.type) {
			case constants.reportTypes.PERSON:
				return this.renderPersonForm();
				
			case constants.reportTypes.LOCATION:
				return this.renderLocationForm();
			
			case constants.reportTypes.EMAIL:
				return this.renderEmailForm();
				
			case constants.reportTypes.PHONE:
				return this.renderPhoneForm();
				
			default:
				return null;
		}
		
	}
	
	renderPersonForm() {
		let statesList = [];
		
		for(let state in STATES) {
			statesList.push(<option key={state} value={state}>{STATES[state]}</option>)
		}
		
		return (
			<div id="search-form">
				<input
					type="text"
					placeholder="eg. John Doe"
					defaultValue={this.props.criteria.text}
					onChange={this.handleInputChange}
					name="text"
				/>

				<select name="state" defaultValue={this.props.criteria.state} onChange={this.handleInputChange}>
					{statesList}
				</select>
				<button onTouchTap={this.doSearch} onClick={this.doSearch}>Search</button>
			</div>
		);
	}
	
	renderLocationForm() {
		
	}
	
	renderEmailForm() {
		
	}
	
	renderPhoneForm() {
		
	}
};