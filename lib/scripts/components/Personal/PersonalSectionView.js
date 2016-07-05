import constants from '../constants/pubRecConstants';
import React, { Component } from 'react';
import LabelValue from './LabelValue';
import TableView from './TableView';
import SingleColumnRow from './SingleColumnRow';
import PhotoView from './PhotoView';
import SimpleRow from './SimpleRow';

const PersonalSectionView = (props) => {


	let content = [];

    content.push( <SimpleRow key={'name-' + Math.ceil(Math.random()*100000)} rowLabel="Name" rowContent={props.name} /> );

	if(props.aliases){
	    content.push( <SingleColumnRow key={'aliases-' + Math.ceil(Math.random()*100000)} rowLabel="Aliases" rowContent={props.aliases} /> );
	}

	if(props.birthInfo){
		content.push( <TableView key={'age-' + Math.ceil(Math.random()*100000)} tableHeaders={['Age', 'Birthday', 'Astrological Sign']} tableRows={props.birthInfo}/> );
	}

	if(props.photos){
	    content.push( <PhotoView key={'photos-' + Math.ceil(Math.random()*100000)} rowLabel="Possible Photos" rowContent={props.photos}/> );
	}

    if(props.jobs){
	    content.push( <SingleColumnRow key={'jobs-' + Math.ceil(Math.random()*100000)} rowLabel="Jobs" rowContent={props.jobs} /> );
	}

	if(props.education){
	    content.push( <TableView key={'education-' + Math.ceil(Math.random()*100000)} tableHeaders={['School', 'Degree']} tableRows={props.education}/> );
	}

	if(props.relatedLinks){
	    content.push( <TableView key={'urls-' + Math.ceil(Math.random()*100000)} tableHeaders={['Name', 'Url']} tableRows={props.relatedLinks}/> );
	}

	return(
		<section id="personal"> <h2>Contact Information:</h2> {content} </section>
	);
}

export default PersonalSectionView;