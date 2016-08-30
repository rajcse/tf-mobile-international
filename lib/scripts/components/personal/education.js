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
						if(!_.isEmpty(edu.degree)) {
							return (
								<li key={i}>
									<h4>{edu.degree}</h4>
									<p>{edu.school}</p>
									<p>({_.has(edu,'start.year') ? edu.start.year : ''} - {_.has(edu,'end.year') ? edu.end.year : ''})</p>
								</li>
							);
						}

						return;
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
