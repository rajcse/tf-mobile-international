import constants from '../constants/pubRecConstants';
import React, { Component } from 'react';
import CriminalDivView from './CriminalDivView';


const CriminalRecordsSectionView = (props) => {

	let mostLikely = [],
		likely = [],
		leastLikely = [];

	for(var record in props.data){
		if(props.data[record].matching_fields.dob == 'true'){
			mostLikely.push( record );
		} else if(props.data[record].matching_fields.state == 'true') {
			likely.push( props.data[record] );
		} else {
			leastLikely.push( props.data[record] );
		}
	}

	return (

		<section id="criminal"> <h2>Criminal Records:</h2>
			<h4>Most Likely</h4>
			{ mostLikely.map(content => <CriminalDivView key={'div-' + Math.ceil(Math.random()*100000)} data= {_.pick(content, "matching_fields", "offender_id", "case_number", "case_filing_date", "name", "dob", "address", "offenses", "county_of_origin")} />) }
			<h4>Likely</h4>
			{ likely.map(content => <CriminalDivView key={'div-' + Math.ceil(Math.random()*100000)} data= {_.pick(content, "matching_fields", "offender_id", "case_number", "case_filing_date", "name", "dob", "address", "offenses", "county_of_origin")} />) }
			<h4>Least Likely</h4>
			{ leastLikely.map(content => <CriminalDivView key={'div-' + Math.ceil(Math.random()*100000)} data= {_.pick(content, "matching_fields", "offender_id", "case_number", "case_filing_date", "name", "dob", "address", "offenses", "county_of_origin")} />) }

		</section>
	);
}

export default CriminalRecordsSectionView;