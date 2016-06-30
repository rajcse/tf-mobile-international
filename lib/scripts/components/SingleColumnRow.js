import React, { Component } from 'react';

const SingleColumnRow = (props) => {
	return (
		<div><h3>{props.rowLabel}:</h3>
			<div>
				{props.rowContent.map(content => (<div> {content} </div>))}
			</div>
		</div>
	);
}

export default SingleColumnRow;