import React, { Component } from 'react';
import ObjectRow from './ObjectRow';

import uuid from 'uuid';

const MultipleDivView = (props) => {

	let result = [];
	let temp = props.data;

	for(let i in temp) {
	    result.push(
			<ObjectRow
				key={'rows-' + uuid.v1()}
				label={i}
				value={temp[i]}
			/>
		);
	 }

	return <div>{result}</div>
}

export default MultipleDivView;
