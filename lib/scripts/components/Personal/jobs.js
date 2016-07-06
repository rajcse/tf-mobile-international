import React, { Component } from 'react';
import classNames from 'classnames';

const JobsColumn = (props) => {
	let listClass = 'default ';

	if ( props.className ) {
		listClass += props.className;
	}

	return (
		<div className="simple-column row">
			<h4>{props.rowLabel}</h4>
			<ul className={listClass}>
				{ props.rowContent.map((content, i) => (
					<li key={i}>
						<strong>{content.title}</strong>
						<p>{ content.industry ? 'Industry: ' + content.industry : null }</p>
						<p>{ content.organization ? 'Organization: ' + content.organization : null }</p>
					</li>
				)) }
			</ul>
		</div>
	);
}

export default JobsColumn;
