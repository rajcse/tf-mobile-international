import constants from '../../constants/pubRecConstants';
import React from 'react';
import PersonTeaserRow from './PersonTeaserRow';
import PhoneTeaserRow from './PhoneTeaserRow';
import EmailTeaserRow from './EmailTeaserRow';

const ResultsList = (props) => {
	let results;

	switch(props.type) {
		case constants.recordTypes.PERSON:
		default:
			results = props.results[constants.recordTypes.PERSON].map(result => <PersonTeaserRow key={result['@search_pointer']} {...result} />);
			break;

		case constants.recordTypes.PHONE:
			results = <PhoneTeaserRow {...props.results[constants.recordTypes.PHONE][0]} />;
			break;

		case constants.recordTypes.EMAIL:
			results = <EmailTeaserRow {...props.results[constants.recordTypes.EMAIL][0]} />;
			break;

		case constants.recordTypes.LOCATION:
			break;
	}

	return (
		<ul id="results">
			{results}
		</ul>
	);
};

ResultsList.propTypes = {
	type: React.PropTypes.string,
	results: React.PropTypes.object
};

export default ResultsList;
