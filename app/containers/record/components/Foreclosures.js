import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import constants from 'constants/pubRecConstants';
import SimpleRow from 'components/SimpleRow';

const Foreclosures = (props) => {
	let { foreclosures } = props;
	return (
		<div className="multi-container">
			<section id="foreclosures" className="widget multi-widget premium">
				<h2 className="title">Possible Foreclosures</h2>
				{ foreclosures.map((foreclosure, index) => (
					<div className="license widget" key={index}>
						<h3 className="title">{foreclosure.company_name}</h3>
						<SimpleRow
							key={`name-${uuid.v4()}`}
							content={foreclosure.name.first + ' ' + foreclosure.name.last}
							title="Name"
						/>
						{ foreclosure.corporation_number ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={foreclosure.corporation_number}
								title="Corporation Number"
							/> : null
						}
						{ foreclosure.title ?
							<SimpleRow
								key={`title-${uuid.v4()}`}
								content={foreclosure.title}
								title="Title"
							/> : null
						}
						{ foreclosure.status_description ?
							<SimpleRow
								key={`status-${uuid.v4()}`}
								content={foreclosure.status_description}
								title="Status"
							/> : null
						}
						{ foreclosure.record_date ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={constants.months[foreclosure.record_date.month] + ', ' + foreclosure.record_date.day + ' ' + foreclosure.record_date.year}
								title="Record Date"
							/> : null
						}
						{ _.has(foreclosure, 'filing_date.month') ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={constants.months[foreclosure.filing_date.month] + ', ' + foreclosure.filing_date.day + ' ' + foreclosure.filing_date.year}
								title="Filing Date"
							/> : null
						}
						{ foreclosure.state ?
							<SimpleRow
								key={`address-${uuid.v4()}`}
								content={foreclosure.state}
								title="State"
							/> : null
						}

					</div>
				)) }
			</section>
		</div>
	);
};

Foreclosures.propTypes = {
	foreclosures: React.PropTypes.array.isRequired
};

export default Foreclosures;
