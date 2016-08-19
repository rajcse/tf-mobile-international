import React from 'react';
import _ from 'lodash';

const SimpleColumn = (props) => {
	let { title, content } = props;

	return (
		<div className="simple-column row">
			<div className="label">
				<h4>{title}</h4>
			</div>

			<div className="content content-full">
				{_.isArray(content) ?
					<ul className="default">
						{ content.map((content, i) => (
							<li key={i}>
								<h4>{content.display}</h4>
							</li>
						)) }
					</ul>
						: <p>{content}</p> }
			</div>
		</div>
	);
};

// Validate props
SimpleColumn.propTypes = {
	title: React.PropTypes.string.isRequired,
	content: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.array
	])
};

export default SimpleColumn;
