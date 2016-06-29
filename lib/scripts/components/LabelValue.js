import React, { Component } from 'react';

const LabelValue = (props) => {
	if(props.value !== '') {
		return (
			<div>
				<h4>
					{props.label}:
				</h4>
				<p>
					{props.value}
				</p>
			</div>
		);
	} else {
		return(false);
	}
}

export default LabelValue;