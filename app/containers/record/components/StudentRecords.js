import React, { PropTypes } from 'react';
import SimpleRow from 'components/SimpleRow';
import uuid from 'uuid';
import _ from 'lodash';
import Sticky from 'react-stickynode';

const StudentRecords = (props) => {
	let { records } = props;

	return (
		<div className="student widget premium" >
			<Sticky>
				<h2 className="title">High School Records</h2>
			</Sticky>

			{ _.map(records, (record) => {
				return (
					<div key={uuid.v4()}>
						{ !record.high_school_grad_year ? null :
							<SimpleRow
								content={record.high_school_grad_year}
								title="High School Graduation Year"
							/>
						}

						{ record.student_data && record.student_data.attended_high_school ?
							<SimpleRow
								content={record.student_data.attended_high_school ? 'Yes' : 'No'}
								title="Attended High School"
							/>
						: null }

						{ record.student_data && record.student_data.years_since_hs_graduation ?
							<SimpleRow
								content={record.student_data.years_since_hs_graduation > 0 ? 'Yes' : 'No'}
								title="Graduated High School"
							/>
						: null }
					</div>
				);
			})}
		</div>
	);
};

StudentRecords.propTypes = {
	records: PropTypes.array
};

export default StudentRecords;
