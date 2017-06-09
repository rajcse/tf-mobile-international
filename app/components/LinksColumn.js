import React from 'react';
import classNames from 'classnames';
import Svg from 'components/svg/Svg';
import _ from 'lodash';

const LinksColumn = (props) => {
	let { links, classes } = props;

	return (
		<div className="outer simple-column row">
			<div className="content content-full">
				<ul className={classNames('default', classes)}>
					{ links.map((link, i) => {
						if(link.url) {
							return (
								<li key={i}>
									<a href={link.url}>{link.name ? _.capitalize(link.name) : _.truncate(link.url, { length: 27 })}</a>
									<Svg svg="externalLink" className="external-link" />
								</li>
							);
						}
					}) }
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
