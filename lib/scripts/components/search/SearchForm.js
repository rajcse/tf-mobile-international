import constants from '../../constants/pubRecConstants';
import _ from 'lodash';
import React, { Component } from 'react';
import viewActions from '../../actions/viewActions';
import {STATES} from '../../utils/states';
import PillSelector from '../Shared/PillSelector';
import Loader from '../Shared/Loader';

function _formatPhone(phone) {
	let numValue = phone.replace(/[^0-9]/g, ''),
		numGroups = numValue.match(/([0-9]{0,3}){1}([0-9]{0,3})?([0-9]{0,4})?/),
		formattedPhone = '';

	if(numGroups[1]) formattedPhone = '(' + numGroups[1];

	if(numGroups[1].length == 3 && numGroups[2]) {
		formattedPhone += ') ';
	}

	if(numGroups[2]) {
		formattedPhone += numGroups[2];

		if(numGroups[2].length == 3 && numGroups[3]) {
			formattedPhone += '-';
		}
	}

	if(numGroups[3]) {
		formattedPhone += numGroups[3];
	}

	return formattedPhone;
}

export default class SearchForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			error: null
		};
		
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handlePhoneKeyPress = this.handlePhoneKeyPress.bind(this);
		this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
		this.doSearch = this.doSearch.bind(this);
	}
		
	handleInputChange(e) {
		// Format the phone number
		if(this.props.criteria.type === constants.reportTypes.PHONE) e.target.value = _formatPhone(e.target.value);
		
		viewActions.updateSearchCriteria({field: e.target.name, value: e.target.value});
		if(this.props.criteria[this.props.criteria.type].text) this.setState({error: null});
	}
	
	handlePhoneKeyPress(e) {
		// Allow chosen keys to work as normal
		let allowedKeys = [8, 37, 38, 39, 40, 46, 13];
		if (allowedKeys.indexOf(e.which) >= 0) return true;

		// Numbers only
		if (!(e.which >= 48 && e.which <= 57)) return e.preventDefault();
		
		// Ten numbers only
		if (e.target.value.replace(/[^0-9]/g, '').length >= 10) return e.preventDefault();		
	}
	
	handleSearchTypeChange(searchType) {
		viewActions.updateSearchCriteria({field: 'type', value: searchType});
		this.setState({error: null});
	}
	
	doSearch(e) {
		e.preventDefault();
		
		// Local criteria for customization
		let search = {
			type: this.props.criteria.type
		};
		
		switch(this.props.criteria.type) {
			// By default, perform a person search
			case constants.reportTypes.PERSON:
			default:
				if(!this.props.criteria[constants.reportTypes.PERSON].text) return this.setState({error: 'Please enter a valid first and last name'});
				
				let fullName = this.props.criteria[constants.reportTypes.PERSON].text.trim().split(' ').filter(val => val),
					firstName = fullName.shift(),
					lastName = fullName.join(' ');
					
				if(!fullName.length) return this.setState({error: 'Please enter a last name'});
					
				search.query = {firstName: firstName, lastName: lastName, state: this.props.criteria[constants.reportTypes.PERSON].state};
				break;
			
			case constants.reportTypes.PHONE:
				let phoneNumber = this.props.criteria[constants.reportTypes.PHONE].text.replace(/[^0-9]/g, '');
				if(phoneNumber.length !== 10) return this.setState({error: 'Please enter a valid phone number'});
				search.query = {phone: phoneNumber};
				break;
			
			case constants.reportTypes.EMAIL:
				let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
				if(!emailRegex.test(this.props.criteria[constants.reportTypes.EMAIL].text)) return this.setState({error: 'Please enter a valid email'});
				search.query = {email: this.props.criteria[constants.reportTypes.EMAIL].text};
				break;				
		}
		
		viewActions.search(search);
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
				
		}
		
		return (
			<form id="search-form" onSubmit={this.doSearch}>
				<PillSelector disabled={this.props.searching} items={searchTypePills} name="search-type" onChange={this.handleSearchTypeChange} defaultValue={this.props.criteria.type || constants.reportTypes.PERSON}/>
				{form}
				{this.state.error ? <p className="error-message">* {this.state.error}</p> : null}
				{this.props.searching ? <Loader green /> : <button type="search" onTouchTap={this.doSearch}>Search</button>}
			</form>
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
					placeholder="e.g. John Doe"
					value={this.props.criteria[constants.reportTypes.PERSON].text}
					onChange={this.handleInputChange}
					disabled={this.props.searching}
					name="text"
				/>

				<select name="state" disabled={this.props.searching} defaultValue={this.props.criteria[constants.reportTypes.PERSON].state || 'ALL'} onChange={this.handleInputChange}>
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
					placeholder="e.g. (555) 555-5555"
					value={this.props.criteria[constants.reportTypes.PHONE].text}
					onChange={this.handleInputChange}
					onKeyPress={this.handlePhoneKeyPress}
					disabled={this.props.searching}
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
					placeholder="e.g. john@example.com"
					value={this.props.criteria[constants.reportTypes.EMAIL].text}
					onChange={this.handleInputChange}
					disabled={this.props.searching}
					name="text"
				/>
			</div>
		);
	}
};