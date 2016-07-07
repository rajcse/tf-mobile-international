import React, { Component } from 'react';

const SimpleRow = (props) => {
	return (
		<div className='simple row'>
			<div className='label'>
				<h4>{props.rowLabel}</h4>
			</div>

			<div className='content'>
				<p>{props.rowContent}</p>
			</div>
		</div>
	);
}

export default SimpleRow;
