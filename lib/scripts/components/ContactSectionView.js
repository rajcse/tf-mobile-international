import constants from '../constants/pubRecConstants';
import React, { Component } from 'react';
import LabelValue from './LabelValue';
import TableView from './TableView';
import SingleColumnRow from './SingleColumnRow';
import PhotoView from './PhotoView';
import SimpleRow from './SimpleRow';

const ContactSectionView = (props) => {


	let content = [];

	if(props.phones){
		content.push( <TableView key={'phones-' + Math.ceil(Math.random()*100000)} tableHeaders={['Carrier', 'Line Type', "Number"]} tableRows={props.phones}/> );
	}

	if(props.emails){
	    content.push( <SingleColumnRow rowLabel="Email Addresses" key={'emails-' + Math.ceil(Math.random()*100000)} rowContent={props.emails} /> );
	}

	return(
		<section id="contact"> <h3>Contact Information:</h3> {content} </section>
	);
}

export default ContactSectionView;