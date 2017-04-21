import constants from 'constants/pubRecConstants';
import _ from 'lodash';
import React from 'react';
import viewActions from 'actions/viewActions';
import {CASTATES} from 'utils/castates';
import {USSTATES} from 'utils/usstates';
import {AUSTATES} from 'utils/austates';
import {COUNTRIES} from 'utils/countries';
import PillSelector from 'components/PillSelector';

function _formatPhone(phone) {

	let numValue = phone.replace(/[^0-9]/g, '').substr(-10),
		numGroups = numValue.match(/([0-9]{0,3}){1}([0-9]{0,3})?([0-9]{0,4})?/),
		formattedPhone = '';

	if(numGroups[1]) formattedPhone = '(' + numGroups[1];

	if(numGroups[1].length === 3 && numGroups[2]) {
		formattedPhone += ') ';
	}

	if(numGroups[2]) {
		formattedPhone += numGroups[2];

		if(numGroups[2].length === 3 && numGroups[3]) {
			formattedPhone += '-';
		}
	}

	if(numGroups[3]) {
		formattedPhone += numGroups[3];
	}

	return formattedPhone;
}

export default class SearchForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			error: null,
			fullStateNames: false,
			fullCountryNames: false,
			states: null
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleStateSelectorChange = this.handleStateSelectorChange.bind(this);
		this.handleCountrySelectorChange = this.handleCountrySelectorChange.bind(this);
		this.handlePhoneKeyPress = this.handlePhoneKeyPress.bind(this);
		this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
		this.doSearch = this.doSearch.bind(this);
		this.showFullStateNames = this.showFullStateNames.bind(this);
		this.showFullCountryNames = this.showFullCountryNames.bind(this);
	}

	handleInputChange(e) {
		// Format the phone number
		if(this.props.criteria.type === constants.recordTypes.PHONE) e.target.value = _formatPhone(e.target.value);

		viewActions.updateSearchCriteria({field: e.target.name, value: e.target.value});

		// Reset the error until they try to submit again
		this.setState({
			error: null
		});
	}

	handleStateSelectorChange(e) {
		// Focus on button to reset state toggle
		viewActions.updateSearchCriteria({field: e.target.name, value: e.target.value});

		// Reset the error until they try to submit again
		this.setState({
			fullStateNames: false,
			error: null
		});
	}

	handleCountrySelectorChange(e) {
		// Focus on button to reset state toggle
		viewActions.updateSearchCriteria({field: e.target.name, value: e.target.value});

		let newStates;
		if(e.target.value == 'CA'){
			newStates = CASTATES;
		} else if (e.target.value == 'USA'){
			newStates = USSTATES;
		} else if(e.target.value == 'AU'){
			newStates = AUSTATES;
		}

		// Reset the error until they try to submit again
		this.setState({
			fullCountryNames: false,
			states:newStates,
			error: null
		});
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

	showFullStateNames() {
		this.setState({
			fullStateNames: true
		});
	}

	showFullCountryNames() {
		this.setState({
			fullCountryNames: true
		});
	}

	doSearch(e) {
		e.preventDefault();

		// Local criteria for customization
		let search = {
				type: this.props.criteria.type
			},
			firstName,
			middleInitial,
			lastName,
			city,
			phoneNumber,
			emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;

		switch(this.props.criteria.type) {
			// By default, perform a person search
			case constants.recordTypes.PERSON:
			default:
				if(!this.props.criteria[constants.recordTypes.PERSON].firstName || !this.props.criteria[constants.recordTypes.PERSON].lastName) return this.setState({error: true});

				firstName = this.props.criteria[constants.recordTypes.PERSON].firstName.trim();
				middleInitial = this.props.criteria[constants.recordTypes.PERSON].middleInitial.trim();
				lastName = this.props.criteria[constants.recordTypes.PERSON].lastName.trim();
				city = _.has(this.props.criteria[constants.recordTypes.PERSON],'city') ? this.props.criteria[constants.recordTypes.PERSON].city.trim() : '';
				search.query = {firstName: firstName, 
					middleInitial: middleInitial,
					lastName: lastName,
					state: this.props.criteria[constants.recordTypes.PERSON].state, 
					city: city, 
					country: this.props.criteria[constants.recordTypes.PERSON].country};
				break;

			case constants.recordTypes.PHONE:
				phoneNumber = this.props.criteria[constants.recordTypes.PHONE].text.replace(/[^0-9]/g, '');
				if(phoneNumber.length !== 10) return this.setState({error: true});
				search.query = {phone: phoneNumber};
				break;

			case constants.recordTypes.EMAIL:
				if(!emailRegex.test(this.props.criteria[constants.recordTypes.EMAIL].text)) return this.setState({error: true});
				search.query = {email: this.props.criteria[constants.recordTypes.EMAIL].text};
				break;
		}

		viewActions.search(search);
	}

	renderPersonForm() {
		return (
			<div id="person-search">
				<div className="row">
					<div className="controls">
						<label>{this.state.error && !this.props.criteria[constants.recordTypes.PERSON].firstName ? <span className="error-message">Please Enter a First Name</span> : 'First Name'}</label>
						<input
							type="text"
							placeholder="John"
							value={this.props.criteria[constants.recordTypes.PERSON].firstName}
							onChange={this.handleInputChange}
							disabled={this.props.searching}
							name="firstName"
						/>
					</div>

					<div className="controls">
						<label>Mid Initial</label>
						<input
							type="text"
							maxLength="1"
							value={this.props.criteria[constants.recordTypes.PERSON].middleInitial}
							onChange={this.handleInputChange}
							disabled={this.props.searching}
							name="middleInitial"
						/>
					</div>
				</div>
				<div className="row">
					<div className="controls">
						<label>{this.state.error && !this.props.criteria[constants.recordTypes.PERSON].lastName ? <span className="error-message">Please Enter a Last Name</span> : 'Last Name'}</label>
						<input
							type="text"
							placeholder="Doe"
							value={this.props.criteria[constants.recordTypes.PERSON].lastName}
							onChange={this.handleInputChange}
							disabled={this.props.searching}
							name="lastName"
						/>
					</div>
				</div>
				<div className="row">
					<div className="controls">
						<label>{this.state.error && !this.props.criteria[constants.recordTypes.PERSON].city ? <span className="error-message">Please Enter City</span> : 'City'}</label>
						<input
							type="text"
							value={this.props.criteria[constants.recordTypes.PERSON].city}
							onChange={this.handleInputChange}
							disabled={this.props.searching}
							name="city"
						/>
					</div>
					{this.state.states && 
					<div className="controls">
						<label>State</label>
						<select
							name="state"
							disabled={this.props.searching}
							defaultValue={this.props.criteria[constants.recordTypes.PERSON].state || 'ALL'}
							onFocus={this.showFullStateNames}
							onChange={this.handleStateSelectorChange}
						>
							{ _.map(this.state.states, (state, index) => {
								return (<option key={index} value={index}>
									{ this.state.fullStateNames ? state : index}
								</option>);
							}) }
						</select>
					</div>
					}
				</div>
				<div className="row">
					<div className="controls">
						<label>Country</label>
						<select
							name="country"
							disabled={this.props.searching}
							defaultValue={this.props.criteria[constants.recordTypes.PERSON].country || 'ALL'}
							onFocus={this.showFullCountryNames}
							onChange={this.handleCountrySelectorChange}
						>
							{ _.map(COUNTRIES, (country, index) => {
								return (<option key={index} value={index}>
									{ this.state.fullCountryNames ? country : index}
								</option>);
							}) }
						</select>
					</div>
				</div>
			</div>
		);
	}

	renderPhoneForm() {
		return (
			<div id="phone-search">
				<div className="controls">
					<label>{this.state.error ? <span className="error-message">Please enter a valid phone number</span> : 'Phone Number'}</label>
					<input
						type="tel"
						placeholder="(555) 555-5555"
						value={this.props.criteria[constants.recordTypes.PHONE].text}
						onChange={this.handleInputChange}
						onKeyPress={this.handlePhoneKeyPress}
						disabled={this.props.searching}
						name="text"
					/>
				</div>
			</div>
		);
	}

	renderEmailForm() {
		return (
			<div id="email-search">
				<div className="controls">
					<label>{this.state.error ? <span className="error-message">Please enter a valid email address</span> : 'Email Address'}</label>
					<input
						type="email"
						placeholder="john@example.com"
						value={this.props.criteria[constants.recordTypes.EMAIL].text}
						onChange={this.handleInputChange}
						disabled={this.props.searching}
						name="text"
					/>
				</div>
			</div>
		);
	}

	render() {
		let form = null,
			searchTypePills = [
				{
					label: 'Person',
					value: constants.recordTypes.PERSON
				},{
					label: 'Phone',
					value: constants.recordTypes.PHONE
				}, {
					label: 'Email',
					value: constants.recordTypes.EMAIL
				}
			];

		switch(this.props.criteria.type) {
			// By default, render the person search
			case constants.recordTypes.PERSON:
			default:
				form = this.renderPersonForm();
				break;

			case constants.recordTypes.PHONE:
				form = this.renderPhoneForm();
				break;

			case constants.recordTypes.EMAIL:
				form = this.renderEmailForm();
				break;
		}

		return (
			<form id="search-form" onSubmit={this.doSearch}>
				<div className="search-type-selector">
					<PillSelector
						disabled={this.props.searching}
						items={searchTypePills}
						name="search-type"
						onChange={this.handleSearchTypeChange}
						value={this.props.criteria.type || constants.recordTypes.PERSON}
					/>
				</div>

				{form}

				<button disabled={this.props.searching} type="search" onClick={this.doSearch}>{this.props.searching ? 'Searching...' : 'Search'}</button>
			</form>
		);
	}
}

SearchForm.propTypes = {
	criteria: React.PropTypes.object,
	searching: React.PropTypes.bool
};
