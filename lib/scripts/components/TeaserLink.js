import constants from '../constants/pubRecConstants';
import _ from 'lodash';
import React, { Component } from 'react';
import viewActions from '../actions/viewActions';

export default class TeaserLink extends Component {
	constructor(props) {
		super(props);
		
		this.selectTeaser = this.selectTeaser.bind(this);
	}
	
	createPersonRecord() {
		let person = this.props.person,
			recordData = {
				'pointer': person['@search_pointer'],
				'lexis_id': person['@id'],
				'name': {
					'first': null,
					'last': null,
					'middle': null,
					'raw': null,
					'suffix': null,
					'type': null
				},
				'location': {
					'address': {
						'street': null,
						'street2': null,
						'city': null,
						'state': null,
						'zip_code': null
					}
				},
				'dobs': {
					'date': null,
					'date_range': null
				},
				'dods': {
					'date': null,
					'date_range': null
				}
			};
			
		// Populate the record data
		if(person.names) {
			recordData.name = {
				'first': person.names[0].first,
				'last': person.names[0].last,
				'middle': person.names[0].middle,
				'raw': person.names[0].raw,
				'suffix': person.names[0].suffix,
				'type': person.names[0].type
			};
		}
		
		if(person.locations) {
			recordData.location.address = {
				'street': person.locations[0].address.street,
				'street2': person.locations[0].address.street2,
				'city': person.locations[0].address.city,
				'state': person.locations[0].address.state,
				'zip_code': person.locations[0].address.zip_code
			};
		}
		
		if(person.dobs) {
			recordData.dobs = {
				'date': person.dobs[0].date,
				'date_range': person.dobs[0].date_range
			};
		}
		
		if(person.dods) {
			recordData.dods = {
				'date': person.dods[0].date,
				'date_range': person.dods[0].date_range
			};
		}
		
		return recordData;
	}
	
	selectTeaser(e) {
		let recordData;
		
		console.time('teaser-select');
		
		// Redundant, but also future proof if onClick can be removed
		e.preventDefault();
		
		switch (this.props.reportType) {
			case constants.reportTypes.PERSON:
				recordData = this.createPersonRecord();
				break;
			default:
				break;
		}
		
		viewActions.selectTeaser(recordData, this.props.reportType);
		console.timeEnd('teaser-select');
	}
	
	render() {
		return (
			<a className="teaser-link" onTouchTap={this.selectTeaser} >
				{this.props.children}
			</a>
		);
	}
};
