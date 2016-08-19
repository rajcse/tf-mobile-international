import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

const SimpleInline = (props) => {
	let { title, contents, classes } = props;

	let inlineNode = [];

	{ _.map(contents, (content, index) => {
		if (!_.isNull(content) || !_.isEmpty(content)) {
			inlineNode.push(
				<div className={classNames('inline', classes)}>
					<div className="label">
						<h4>{title[index]}</h4>
					</div>

					<div className="content">
						<p>{content}</p>
					</div>
				</div>
			);
		}
	});}

	return (
		<div className="simple-inline row">
			{inlineNode}
		</div>
	);
};

SimpleInline.propTypes = {
	title: React.PropTypes.array.isRequired,
	contents: React.PropTypes.array,
	classes: React.PropTypes.string
};

export default SimpleInline;
