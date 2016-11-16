import React from 'react';
import classNames from 'classnames';

const SingleColumnRow = (props) => {
	let { classes, rowLabel, rowContent } = props;

	return (
		<div className="simple-column row">
			<div className="label">
				<h4>{rowLabel}</h4>
			</div>

			<div className="content">
				<ul className={classNames('default', classes)}>
					{ rowContent.map((content, i) => (
						<li key={i}> {content} </li>
					)) }
				</ul>
			</div>
		</div>
	);
};

SingleColumnRow.propTypes = {
	classes: React.PropTypes.array,
	rowLabel: React.PropTypes.string.isRequired,
	rowContent: React.PropTypes.array.isRequired
};

export default SingleColumnRow;
