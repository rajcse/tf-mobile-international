import React, { Component } from 'react';
import classNames from 'classnames';

const SingleColumnRow = (props) => {
	let listClass = 'default ';

	if ( props.className ) {
		listClass += props.className;
	}

	return (
		<div className='simple-column row'>
			<h4 className='label'>{props.rowLabel}</h4>
			<ul className={listClass}>
				{props.rowContent.map((content, i) => (
					<li key={i}> {content} </li>
				))}
			</ul>
		</div>
	);
}

export default SingleColumnRow;
