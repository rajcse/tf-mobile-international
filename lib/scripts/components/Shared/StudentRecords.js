import React, { PropTypes } from 'react';
import SimpleRow from '../shared/SimpleRow';

const StudentRecords = (props) => {
	let { education } = props;

	return (
		!education[0].high_school_grad_year ? null :
		<div className="student widget premium" >
					<h3 className="title">High School Records</h3>
					{ !education[0].high_school_grad_year ? null :
						<SimpleRow
							key=''
							content={education[0].high_school_grad_year}
							title="High School Graduation Year"
						/>
					}
		</div>

	);
};

// Validate props
StudentRecords.propTypes = {
	education: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.array
	])
};

export default StudentRecords;
