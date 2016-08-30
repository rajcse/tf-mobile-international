import constants from '../../constants/pubRecConstants';
import React from 'react';
import TeaserLink from '../TeaserLink';
import _ from 'lodash';
import uuid from 'uuid';
import SimpleInline from '../shared/SimpleInline';

const RelativesColumn = (props) => {
	let { title, relatives, calculateAge } = props;

	let content = [];

	relatives.map((relative, i) => {
		const location = _.head(relative.locations);
		const dob = _.head(relative.dobs);
		const date = !_.isUndefined(dob) && !_.isNull(dob.date) ? dob.date : null;
		const age = calculateAge(date);

		content.push(
			<li key={i}>
				<h4>{relative.names[0].display}</h4>

				{ relative.available_criminal_records > 0 ?
					<p>
						<small><strong>({relative.available_criminal_records}) </strong>
							Possible Criminal Records
						</small>
					</p>
				: null }

				{ !_.isUndefined(location) ?
					<SimpleInline
						key={uuid.v4()}
						title={['Location', 'Age']}
						contents={[`${location.address.city}, ${location.address.state}`, age] }
						classes="inline-half"
					/>
				: null }

				<TeaserLink
					teaser={relative}
					classes="btn-link btn"
					recordType={constants.recordTypes.PERSON}> View Person Report
				</TeaserLink>
			</li>
		);
	});

	return (
		<div className="simple-column row">
			<div className="label label-full">
				<h4>{title}</h4>
			</div>

			<div className="content content-full">
				<ul className="default">
					{ content }
				</ul>
			</div>
		</div>
	);
};

// Validate props
RelativesColumn.propTypes = {
	title: React.PropTypes.string.isRequired,
	relatives: React.PropTypes.array.isRequired,
	calculateAge: React.PropTypes.func.isRequired
};

export default RelativesColumn;
