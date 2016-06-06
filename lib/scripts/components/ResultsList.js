import config from '../config.js';
import React from 'react';
import PersonRow from './PersonRow';

const ResultsList = (props) => (
	<ul id="results" style={styles.ul}>
		{props.results.map(result => <PersonRow key={result['@search_pointer']} {...result} />)}
	</ul>
);

export default ResultsList;

var styles = {
	ul: {
	    'list-style-type': 'none' 
	}
};