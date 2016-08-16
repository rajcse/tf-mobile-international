import React from 'react';

const EducationColumn = (props) => {
	let { title, education } = props;

	return (
		<div className='simple-column row'>
			<div className='label'>
				<h4>{title}</h4>
			</div>

			<div className='content content-full'>
				<ul className='default'>
					{ education.map((edu, i) => (
						<li key={i}>
							<h4>{edu.degree}</h4>
							<p>{edu.school}</p>
							<p>({edu.start.year} - {edu.end.year})</p>
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
