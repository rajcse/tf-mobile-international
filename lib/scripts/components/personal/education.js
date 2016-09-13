import React from 'react';
import _ from 'lodash';

const EducationColumn = (props) => {
	let { title, education } = props;

	return (
		<div className="simple-column row">
			<div className="label">
				<h4>{title}</h4>
			</div>

			<div className="content content-full">
				<ul className="default">
					{ education.map((edu, i) => {
						return (
							<li key={i}>
								{ edu.degree ? <h3>{edu.degree}</h3> : null }
								{ edu.school ? <h4>{edu.school}</h4> : null }
								{_.has(edu,'start.year') ?
									<p>({edu.start.year} {_.has(edu,'end.year') ? `- ${edu.end.year}`: null})</p>
								: null }
								<hr/>
							</li>
						);
					}) }
				</ul>
			</div>
		</div>
	);
};

// Validate props
EducationColumn.propTypes = {
	education: React.PropTypes.array.isRequired,
	title: React.PropTypes.string.isRequired
};

export default EducationColumn;
