import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'lodash';

const LinksColumn = (props) => {
	let { title, links, classes } = props;

	return (
		<div className='simple-column row'>
			<div className='label'>
				<h4>{title}</h4>
			</div>

			<div className='content content-full'>
				<ul className={classNames('default', classes)}>
					{ links.map((link, i) => (
						<li key={i}>
							<h4>{ link.name ? `${_.capitalize(link.name)}` : null }</h4>
							<p>{ link.url ? `${_.capitalize(link.url)}` : null }</p>
						</li>
					)) }
				</ul>
			</div>
		</div>
	);
}

// Validate props
LinksColumn.propTypes = {
    links: PropTypes.array.isRequired
}

export default LinksColumn;
