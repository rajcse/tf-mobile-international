import constants from '../../constants/pubRecConstants';
import React from 'react';
import TeaserLink from '../TeaserLink';
import SimpleInline from '../shared/SimpleInline';
import SimpleRow from '../shared/SimpleRow';
import _ from 'lodash';
import uuid from 'uuid';
import Sticky from 'react-stickynode';

const Associates = (props) => {
	let {
		associates,
		possibleAssociates,
		calculateAge
	} = props;
	let content = [];
	let allAssociates = associates.concat(possibleAssociates);

	allAssociates.map((associate, i) => {
		const dob = _.head(associate.dobs);
		const age = _.get(dob, 'date') ? calculateAge(dob) : null;

		content.push(
			_.get(associate,'names[0].display') ?
				<li key={i}>
					<h4>{associate.names[0].display}</h4>

					{ associate.available_criminal_records >= 1 ?
						<p>
							<small><strong>({associate.available_criminal_records}) </strong>
								Possible Criminal Records
							</small>
						</p>
					: null }

					{ _.get(age, 'birthday') ?
						<SimpleInline
							key={uuid.v4()}
							title={['Date of Birth', 'Age']}
							contents={[age.birthday, age.display]}
							classes="inline-half"
						/>
					: null }

					{ _.get(associate,'date_last_cohabit.date_range.end.month') ?
						<SimpleRow
							key={uuid.v4()}
							title="Date Last Shared Address"
							content={`${constants.months[associate.date_last_cohabit.date_range.end.month]} ${associate.date_last_cohabit.date_range.end.day}, ${associate.date_last_cohabit.date_range.end.year}`}
						/>
					: null }

					{ _.get(associate,'locations[0].address.display') ?
						<SimpleRow
							key={uuid.v4()}
							title="Address"
							content={associate.locations[0].address.display}
						/>
					: null }

					{ _.get(associate,'phones[0].display') ?
						<SimpleRow
							key={uuid.v4()}
							title="Phone Number"
							content={associate.phones[0].display}
						/>
					: null }

					{ _.get(associate,'emails[0].address') ?
						<SimpleRow
							key={uuid.v4()}
							title="Email Address"
							content={associate.emails[0].address}
						/>
					: null }

					<TeaserLink
						key={uuid.v4()}
						teaser={associate}
						classes="btn-link btn"
						recordType={constants.recordTypes.PERSON}> View Person Report
					</TeaserLink>
					<hr/>
				</li> : null
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
	possibleAssociates: React.PropTypes.array,
	calculateAge: React.PropTypes.func.isRequired
};

export default Associates;
