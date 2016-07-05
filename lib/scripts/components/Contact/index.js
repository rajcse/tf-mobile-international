import React, { Component } from 'react';
import LabelValue from '../Shared/LabelValue';
import TableView from '../Shared/TableView';
import SingleColumnRow from '../Shared/SingleColumnRow';
import PhotoView from '../Shared/PhotoView';
import SimpleRow from '../Shared/SimpleRow';

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