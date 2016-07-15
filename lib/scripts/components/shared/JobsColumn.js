import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import moment from 'moment';

const JobsColumn = (props) => {
	let { title, jobs, classes } = props;

	// Remove job listings with empty titles
	jobs = _.dropWhile(jobs, ['title', '']);

	return (
		<div className='simple-column row'>
			<div className='label'>
				<h4>{title}</h4>
			</div>

			<div className='content content-full'>
				<ul className={classNames('default', classes)}>
					{ jobs.map((job, i) => (
						<li key={i}>
							{ !_.isNull(job.date_range.start) ? <p>
								<small>from { moment(`${job.date_range.start.month}/${job.date_range.start.day}/${job.date_range.start.year}`).format('LL') }</small>
								<small> to { moment(`${job.date_range.end.month}/${job.date_range.end.day}/${job.date_range.end.year}`).format('LL') }</small>
							</p> : null }
							<h4>{ job.title }</h4>
							<p>{ job.industry ? 'Industry: ' + job.industry : null }</p>
							<p>{ job.organization ? 'Organization: ' + job.organization : null }</p>
						</li>
					)) }
				</ul>
			</div>
		</div>
	);
}

// Validate props
JobsColumn.propTypes = {
    jobs: PropTypes.array.isRequired
}

export default JobsColumn;
