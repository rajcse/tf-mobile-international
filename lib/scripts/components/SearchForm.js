import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import React, { Component } from 'react';
import viewActions from '../actions/viewActions';
import {STATES} from '../utils/states';
import PillSelector from './PillSelector';

export default class SearchForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			error: null
		};
		
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
		this.doSearch = this.doSearch.bind(this);
	}

	handleInputChange(e) {
		viewActions.updateSearchCriteria({field: e.target.name, value: e.target.value});
		if(this.props.criteria.text) this.setState({error: null})
	}
	
	handleSearchTypeChange(searchType) {
		viewActions.updateSearchCriteria({field: 'type', value: searchType});
		this.setState({error: null});
	}

	doSearch() {
		let query;
		
		switch(this.props.criteria.type) {
			// By default, perform a person search
			case constants.reportTypes.PERSON:
			default:
				if(!this.props.criteria.text) return this.setState({error: 'Please enter a valid first and last name'});
				
				let fullName = this.props.criteria.text.trim().split(' ').filter(val => val),
					firstName = fullName.shift(),
					lastName = fullName.join(' ');
					
				query = {firstName: firstName, lastName: lastName, state: this.props.criteria.state};
				break;
				
			case constants.reportTypes.LOCATION:
				if(!this.props.criteria.text) return this.setState({error: 'Please enter a valid location'});
				break;
			
			case constants.reportTypes.EMAIL:
				if(!this.props.criteria.text) return this.setState({error: 'Please enter a valid email'});
				break;
				
			case constants.reportTypes.PHONE:
				if(!this.props.criteria.text) return this.setState({error: 'Please enter a valid phone number'});
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
				{this.state.error ? <p className="error-message">* {this.state.error}</p> : null}
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
	
	renderPhoneForm() {
		return (
			<div id="phone-search">
				<input
					type="tel"
					placeholder="eg. (555) 555-5555"
					defaultValue={this.props.criteria.text}
					onChange={this.handleInputChange}
					name="text"
				/>
			</div>
		);
	}
	
	renderEmailForm() {
		return (
			<div id="email-search">
				<input
					type="email"
					placeholder="eg. john@example.com"
					defaultValue={this.props.criteria.text}
					onChange={this.handleInputChange}
					name="text"
				/>
			</div>
		);
	}
	
	renderLocationForm() {
		// Coming soon to an app near you!!
	}	
};