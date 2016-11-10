import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

const LinksColumn = (props) => {
	let { links, classes } = props;

	return (
		<div className="simple-column row">
			<div className="content content-full">
				<ul className={classNames('default', classes)}>
					{ links.map((link, i) => (
						link.name
						
						? <li key={i}>
							<a href={link.url}>{_.capitalize(link.name)}</a>
						</li>

						: <li key={i}>
							<a href={link.url}>{link.url}</a>
						</li>
					)) }
				</ul>
			</div>
		</div>
	);
};

// Validate props
LinksColumn.propTypes = {
	classes: React.PropTypes.array,
	links: React.PropTypes.array.isRequired
};

export default LinksColumn;
