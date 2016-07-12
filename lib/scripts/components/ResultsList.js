import constants from '../constants/pubRecConstants';
import React from 'react';
import PersonTeaserRow from './PersonTeaserRow';

const ResultsList = (props) => {
	let results;
	
	switch(props.criteria.type) {
		case constants.reportTypes.PERSON:
		default:
			results = props.results.map(result => <PersonTeaserRow key={result['@search_pointer']} {...result} />)
			break;
			
		case constants.reportTypes.LOCATION:
			break;
		
		case constants.reportTypes.EMAIL:
			break;
			
		case constants.reportTypes.PHONE:
			results = props.results.map(result => <PersonTeaserRow key={result['@search_pointer']} {...result} />)
			break;
					
	}
	
	return (
		<ul id="results">
			{results}
		</ul>
	);
}

export default ResultsList;