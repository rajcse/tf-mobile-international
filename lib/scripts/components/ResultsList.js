import config from '../config.js';
import React from 'react';
import PersonRow from './PersonRow';

const ResultsList = (props) => (
	<ul id="results">
		{props.results.map(result => <PersonRow key={result['@search_pointer']} {...result} />)}
	</ul>
);

export default ResultsList;

var styles = {
};