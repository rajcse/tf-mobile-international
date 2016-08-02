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
			<div className='label label-full'>
				<h4>{title}</h4>
			</div>

			<div className='content content-full'>
				<ul className={classNames('default', classes)}>
					{ jobs.map((job, i) => (
						<li key={i}>
							{ !_.isNull(job.date_range.start) ? <p>
								<small>from { moment({month: job.date_range.start.month, day: job.date_range.start.day, year: job.date_range.start.year}).format('LL') }</small>
								<small> to { moment({month: job.date_range.end.month, day: job.date_range.end.day, year: job.date_range.end.year}).format('LL') }</small>
							</p> : null }
							<h4>{ job.title }</h4>
							<p>{ job.industry ? `Industry: ${_.capitalize(job.industry)}` : null }</p>
							<p>{ job.organization ? `Organization: ${_.capitalize(job.organization)}` : null }</p>
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
