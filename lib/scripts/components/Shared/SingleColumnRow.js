import React, { Component } from 'react';
import classNames from 'classnames';

const SingleColumnRow = (props) => {
	let listClass = 'default ';

	if ( props.className ) {
		listClass += props.className;
	}

	return (
		<div className='simple-column row'>
			<div className='label'>
				<h4>{props.rowLabel}</h4>
			</div>

			<div className='content'>
				<ul className={listClass}>
					{props.rowContent.map((content, i) => (
						<li key={i}> {content} </li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default SingleColumnRow;
