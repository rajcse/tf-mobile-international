import constants from '../../constants/pubRecConstants';
import React from 'react';
import TeaserLink from '../TeaserLink';
import SimpleInline from '../shared/SimpleInline';
import SimpleRow from '../shared/SimpleRow';
import _ from 'lodash';
import uuid from 'uuid';
import Sticky from 'react-stickynode';

const Associates = (props) => {
	let { associates, calculateAge } = props;
	let content = [];

	associates.map((associate, i) => {
		const dob = _.head(associate.dobs);
		const date = !_.isUndefined(dob) && !_.isNull(dob.date) ? dob.date : null;
		const age = calculateAge(date);

		content.push(
			<li key={i}>
				<h4>{associate.names[0].display}</h4>

				{ associate.available_criminal_records >= 1 ?
					<p>
						<small><strong>({associate.available_criminal_records}) </strong>
							Possible Criminal Records
						</small>
					</p>
				: null }

				{ date ?
					<SimpleInline
						key={uuid.v4()}
						title={['Date of Birth', 'Age']}
						contents={[
							`${constants.months[date.month]}, ${date.day} ${date.year}`,
							age.display
						]}
						classes="inline-half"
					/>
				: null }

				{ _.has(associate,'date_last_cohabit.date_range.end.month') ?
					<SimpleRow
						key={uuid.v4()}
						title="Date Last Shared Address"
						content={constants.months[associate.date_last_cohabit.date_range.end.month] + ', ' + associate.date_last_cohabit.date_range.end.day + ' ' + associate.date_last_cohabit.date_range.end.year}
					/>
				: null }

				<TeaserLink
					key={uuid.v4()}
					teaser={associate}
					classes="btn-link btn"
					recordType={constants.recordTypes.PERSON}> View Person Report
				</TeaserLink>
				<hr/>
			</li>
		);
	});

	return (
		<div className="multi-container">
			<section id="associates" className="widget premium">
				<Sticky>
					<h2 className="title">Possible Associates</h2>
				</Sticky>
				<div className="content content-full">
					<ul className="default">
						{content}
					</ul>
				</div>
			</section>
		</div>
	);
};

// Validate props
Associates.propTypes = {
	associates: React.PropTypes.array.isRequired,
	calculateAge: React.PropTypes.func.isRequired
};

export default Associates;
