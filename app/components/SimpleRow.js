import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

const SimpleRow = (props) => {
	let { classes, title, content } = props;

	return (
		<div className="simple row">
			<div className="label">
				<h4>{title}</h4>
			</div>

			<div className="content">
				{_.isArray(content) ?
					<ul className={classNames('default', classes)}>
						{ content.map((item, i) => (
							<li key={i}> {item} </li>
						)) }
					</ul>
					: <p>{content}</p>
				}
			</div>
		</div>
	);
};

SimpleRow.propTypes = {
	title: React.PropTypes.string.isRequired,
	classes: React.PropTypes.string,
	content: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number,
		React.PropTypes.array
	]),
	icon: React.PropTypes.string
};

export default SimpleRow;
