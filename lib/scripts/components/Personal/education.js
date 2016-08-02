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
					{ education.map((education, i) => (
						<li key={i}>
							<h4>{education.display}</h4>
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
