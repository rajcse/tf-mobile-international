import React, { PropTypes } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import moment from 'moment';

const JobsColumn = (props) => {
	let { title, jobs, classes } = props;

	let jobsByTitle = _.uniqBy(jobs, 'title');
	let jobsByOrg = _.uniqBy(jobs, 'organization');

	jobs = _.union(jobsByOrg, jobsByTitle);

	return (
		<div className="simple-column row">
			<div className="label label-full">
				<h4>{title}</h4>
			</div>

			<div className="content content-full">
				<ul className={classNames('default', classes)}>
					{ jobs.map((job, i) => (
						<li key={i}>
							{_.has(job,'title') ? <h4>{ job.title }</h4> : null}
							<p>{ _.has(job,'organization') ? _.startCase(_.toLower(job.organization)) : null }</p>
							{ !_.isNull(job.date_range.start) ?
								<p>({`${moment(job.date_range.start.month, 'MM').format('MMM')} ${job.date_range.start.year} - ${moment(job.date_range.end.month, 'MM').format('MMM')}  ${job.date_range.end.year}`})</p>
							: null }
						</li>
					)) }
				</ul>
			</div>
		</div>
	);
};

// Validate props
JobsColumn.propTypes = {
	jobs: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	classes: PropTypes.string
};

export default JobsColumn;
