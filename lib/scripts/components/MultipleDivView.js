import React, { Component } from 'react';
import ObjectRow from './ObjectRow';

const MultipleDivView = (props) => {
	
	let result = [];
	let temp = props.data;

	for(let i in temp) {
	    result.push(<ObjectRow key={'rows-' + Math.ceil(Math.random()*100000)} label={i} value={temp[i]} />);
	 }

	return (<div>{result}</div>)
}

export default MultipleDivView;