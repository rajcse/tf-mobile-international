import React from 'react';
import _ from 'lodash';

const EducationColumn = (props) => {
	let { title, education } = props;

	// Remove education listings with empty degrees
	education = _.dropWhile(education, ['degree', '']);

	return (
		<div className='simple-column row'>
			<div className='label'>
				<h4>{title}</h4>
			</div>

			<div className='content content-full'>
				<ul className='default'>
					{ education.map((education, i) => (
						<li key={i}>
							<h4>{education.school}</h4>
							<p>{_.capitalize(education.degree)}</p>
						</li>
					)) }
				</ul>
			</div>
		</div>
	);
}

// Validate props
EducationColumn.propTypes = {
    education: React.PropTypes.array.isRequired
}

export default EducationColumn;
