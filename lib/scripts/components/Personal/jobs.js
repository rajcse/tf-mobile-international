import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'lodash';

const JobsColumn = (props) => {
	let listClass = 'default ';

	let { title, jobs, classes } = props;

	if ( classes ) {
		listClass += classes;
	}

	// Remove job listings with empty titles
	jobs = _.dropWhile(jobs, ['title', '']);

	return (
		<div className='simple-column row'>
			<div className='label'>
				<h4>{title}</h4>
			</div>

			<div className='content content-full'>
				<ul className={listClass}>
					{ jobs.map((job, i) => (
						<li key={i}>
							<h4>{job.title}</h4>
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
