import config from '../config.js';
import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import React, { Component } from 'react';
import viewActions from '../actions/viewActions';
import {STATES} from '../utils/states';
import PillSelector from './PillSelector';

export default class SearchForm extends Component {
	constructor(props) {
		super(props);
		
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
		this.doSearch = this.doSearch.bind(this);
	}

	handleInputChange(e) {
		viewActions.updateSearchCriteria({field: e.target.name, value: e.target.value});
	}
	
	handleSearchTypeChange(searchType) {
		viewActions.updateSearchCriteria({field: 'type', value: searchType});
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
		let form = null,
			searchTypePills = [
				{
					label: 'Person',
					value: constants.reportTypes.PERSON
				},{
					label: 'Phone',
					value: constants.reportTypes.PHONE
				},
				{
					label: 'Email',
					value: constants.reportTypes.EMAIL
				}
			];				
		
		switch(this.props.criteria.type) {
			// By default, render the person search
			case constants.reportTypes.PERSON:
			default:
				form = this.renderPersonForm();
				break;
									
			case constants.reportTypes.PHONE:
				form = this.renderPhoneForm();
				break;
					
			case constants.reportTypes.EMAIL:
				form = this.renderEmailForm();
				break;
				
			case constants.reportTypes.LOCATION:
				form = this.renderLocationForm();
				break	
		}
		
		return (
			<div id="search-form">
				<PillSelector items={searchTypePills} name="search-type" onChange={this.handleSearchTypeChange} defaultValue={this.props.criteria.type || constants.reportTypes.PERSON}/>
				{form}
				<button onTouchTap={this.doSearch}>Search</button>
			</div>
		);
	}
	
	renderPersonForm() {
		let statesList = [];
		
		for(let state in STATES) {
			statesList.push(<option key={state} value={state}>{STATES[state]}</option>)
		}
		
		return (
			<div id="person-search">
				<input
					type="text"
					placeholder="eg. John Doe"
					defaultValue={this.props.criteria.text}
					onChange={this.handleInputChange}
					name="text"
				/>

				<select name="state" defaultValue={this.props.criteria.state || 'ALL'} onChange={this.handleInputChange}>
					{statesList}
				</select>
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