import config from '../config.js';
import constants from '../constants/pubRecConstants';
import React, { Component } from 'react';
import LabelValue from './LabelValue';

const CriminalDivView = (props) => {
	
	let content = [];
	let case_filing_date = props.data.case_filing_date;
	
    content.push(<div>Match Rating based on:  {JSON.stringify(props.data.matching_fields)} </div>);

    content.push(<LabelValue label='Name' value={props.data.name.display} />);
    content.push(<LabelValue label='Case Number' value={props.data.case_number} />);

    if(_.has(case_filing_date, 'month')){
		case_filing_date = constants.months[case_filing_date.month] + ', ' + case_filing_date.day + ' ' + case_filing_date.year;
	    content.push(<LabelValue label='Case Filing Date' value={case_filing_date} />);
	}

    content.push(<LabelValue label='Location/County' value={props.data.county_of_origin} />);

	return ( <div> {content} </div> );
}

export default CriminalDivView;