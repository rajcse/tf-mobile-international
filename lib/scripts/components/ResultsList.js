import config from '../config.js';
import React from 'react';
import PersonRow from './PersonRow';

const ResultsList = (props) => (
	<ul style={styles.results}>
		{props.results.map(result => <PersonRow key={result['@search_pointer']} {...result} />)}
	</ul>
);

export default ResultsList;

var styles = {
	results: {
	    listStyleType: 'none',
		margin: 0,
		padding: 0
	}
};