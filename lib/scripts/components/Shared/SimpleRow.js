import React, { Component } from 'react';

const SimpleRow = (props) => {
	return (
		<div>
			<p>
				{props.rowLabel}: {props.rowContent}
			</p>
		</div>
	);
}

export default SimpleRow;