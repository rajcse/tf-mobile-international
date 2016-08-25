import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import { Sticky } from 'react-sticky';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';

const Businesses = (props) => {
	let { businesses } = props;

	return (
		<div className="multi-container">
			<section id="businesses" className="widget multi-widget premium">
				<Sticky>
					<h2 className="title">Businesses</h2>
				</Sticky>
				{ businesses.map((business, index) => (
					<div className="license widget" key={index}>
						<h3 className="title">{business.company_name}</h3>
						<SimpleRow
							key={`name-${uuid.v4()}`}
							content={business.name.first + ' ' + business.name.last}
							title="Name"
						/>
						{ _.has(business, 'corporation_number') ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={business.corporation_number}
								title="Corporation Number"
							/> : null
						}
						<SimpleRow
							key={`title-${uuid.v4()}`}
							content={business.title}
							title="Title"
						/>
						<SimpleRow
							key={`status-${uuid.v4()}`}
							content={business.status_description}
							title="Status"
						/>
						{ _.has(business, 'record_date') ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={constants.months[business.record_date.month] + ', ' + business.record_date.day + ' ' + business.record_date.year}
								title="Record Date"
							/> : null
						}
						{ _.has(business, 'filing_date.month') ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={constants.months[business.filing_date.month] + ', ' + business.filing_date.day + ' ' + business.filing_date.year}
								title="Filing Date"
							/> : null
						}
						{ _.has(business, 'state') ?
							<SimpleRow
								key={`address-${uuid.v4()}`}
								content={business.state}
								title="State"
							/> : null
						}

					</div>
				)) }
			</section>
		</div>
	);
};

Businesses.propTypes = {
	businesses: React.PropTypes.array.isRequired
};

export default Businesses;
