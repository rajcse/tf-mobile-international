import React, { Component } from 'react';
import CriminalDivView from './CriminalDivView';


const CriminalRecordsView = (props) => {
	return (

		<section id="criminal"> <h2>Criminal Records:</h2>
			{ props.data.map(content => <CriminalDivView key={'div-' + Math.ceil(Math.random()*100000)} data= {_.pick(content, "matching_fields", "offender_id", "case_number", "case_filing_date", "name", "dob", "address", "offenses", "county_of_origin")} />) }
		</section>
	);
}

export default CriminalRecordsView;