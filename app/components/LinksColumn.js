import React from 'react';
import classNames from 'classnames';
import Svg from 'components/svg/Svg';
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
								<a href={link.url}><Svg svg="linkIcon" style={{width: 16}} className="link-icon" /> {_.capitalize(link.name)} </a>
							</li>

						: <li key={i}>
							<a href={link.url}><Svg svg="linkIcon" style={{width: 16}} className="link-icon" /> {link.url} </a>
						</li>
					)) }
				</ul>
			</div>
		</div>
	);
};

// Validate props
LinksColumn.propTypes = {
	classes: React.PropTypes.string,
	links: React.PropTypes.array.isRequired
};

export default LinksColumn;
