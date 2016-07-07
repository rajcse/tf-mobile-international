import React, { Component } from 'react';

const SimpleRow = (props) => {
	return (
		<div className='simple row'>
			<h4 className='label'>{props.rowLabel}</h4>
			<p>{props.rowContent}</p>
		</div>
	);
}

export default SimpleRow;
