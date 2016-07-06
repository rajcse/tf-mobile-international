import React, { Component } from 'react';

const SimpleList = (props) => {
	if (props.values !== '') {
		return (
			<div className="standard-list"><h3>{props.label}</h3>
				{props.values.map((content, i) => (
          <p key={i}>{content}</p>
        ))}
			</div>
		);
	} else {
		return(false);
	}
}

export default SimpleList;
