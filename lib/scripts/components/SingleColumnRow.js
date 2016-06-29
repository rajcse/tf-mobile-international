import React, { Component } from 'react';

const SingleColumnRow = (props) => {
	return (
		<div><h3>{props.rowLabel}:</h3>
			<p>
				{props.rowContent.map(content => (<div> {content} </div>))}
			</p>
		</div>
	);
}

export default SingleColumnRow;