import config from '../config.js';
import constants from '../constants/pubRecConstants';
import React from 'react';
import PersonRow from './PersonRow';

const ResultsList = (props) => {
	let results;
	
	switch(props.criteria.type) {
		case constants.reportTypes.PERSON:
			results = props.results.map(result => <PersonRow key={result['@search_pointer']} {...result} />)
			break;
			
		case constants.reportTypes.LOCATION:
			break;
		
		case constants.reportTypes.EMAIL:
			break;
			
		case constants.reportTypes.PHONE:
			break;
			
		default:
			break;
	}
	return (
		<ul id="results">
			{results}
		</ul>
	);
}

export default ResultsList;