import constants from '../../constants/pubRecConstants';
import React from 'react';
import PersonTeaserRow from './PersonTeaserRow';
import PhoneTeaserRow from './PhoneTeaserRow';
import EmailTeaserRow from './EmailTeaserRow';

const ResultsList = (props) => {
	let results;
	
	switch(props.criteria.type) {
		case constants.reportTypes.PERSON:
		default:
			results = props.results[constants.reportTypes.PERSON].map(result => <PersonTeaserRow key={result['@search_pointer']} {...result} />);
			break;
			
		case constants.reportTypes.PHONE:
			results = <PhoneTeaserRow {...props.results[constants.reportTypes.PHONE][0]} />;
			break;
			
		case constants.reportTypes.EMAIL:
			results = <EmailTeaserRow {...props.results[constants.reportTypes.EMAIL][0]} />;
			break;
			
		case constants.reportTypes.LOCATION:
			break;
	}
	
	return (
		<ul id="results">
			{results}
		</ul>
	);
}

export default ResultsList;