import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import uuid from 'uuid';

const SimpleInline = (props) => {
	let { title, contents, classes } = props;

	let inlineNode = [];

	_.map(contents, (content, index) => {
		if (!_.isNull(content) || !_.isEmpty(content)) {
			inlineNode.push(
				<div key={uuid.v4()} className={classNames('inline', classes)}>
					<div className="label">
						<h4>{title[index]}</h4>
					</div>

					<div className="content">
						<p>{content}</p>
					</div>
				</div>
			);
		}
	});

	const finalNode = inlineNode.length > 0 ?
		<div className="simple-inline row">
			{inlineNode}
		</div>
	: null ;

	return finalNode;
};

SimpleInline.propTypes = {
	title: React.PropTypes.array.isRequired,
	contents: React.PropTypes.array,
	classes: React.PropTypes.string
};

export default SimpleInline;
