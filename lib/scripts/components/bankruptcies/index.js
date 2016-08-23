import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import uuid from 'uuid';

import SimpleRow from '../shared/SimpleRow';
import SimpleInline from '../shared/SimpleInline';

function getFileDate(date) {
	if(_.isNull(date)) {
		return 'Bankruptcy Record';
	}

	let formattedDate = moment(`${date.month}/${date.day}/${date.year}`, 'MM/DD/YYYY').format('LL');

	return `Bankruptcy Filed on ${formattedDate}`;
}

const Bankruptcies = (props) => {
	let { bankruptcies } = props;

	return (
		<div className="multi-container">
			<section id="bankruptcies" className="widget multi-widget">
				<h2 className="title">Bankruptcies & Liens</h2>
				{ bankruptcies.map((bankrupt, index) => (
					<div className="bankrupt widget" key={index}>
						<h3 className="title">{getFileDate(bankrupt.file_date)}</h3>

						{(_.has(bankrupt, 'case_number') ?
							<SimpleRow
								key={uuid.v4()}
								content={bankrupt.case_number}
								title="Case Number"
			 /> : null )}

						{(_.has(bankrupt, 'chapter') ?
							<SimpleRow
								key={uuid.v4()}
								content={bankrupt.chapter}
								title="Chapter"
			 /> : null )}

						{(_.has(bankrupt, 'discharge_date') && !_.isNull(bankrupt, 'discharge_date') ?
							<SimpleRow
								key={uuid.v4()}
								content={moment(`${bankrupt.discharge_date.month}/${bankrupt.discharge_date.day}/${bankrupt.discharge_date.year}`, 'MM/DD/YYYY').format('LL')}
								title="Discharge Date"
			 /> : null )}

						{(_.has(bankrupt, 'filing_type') ?
							<SimpleRow
								key={uuid.v4()}
								content={_.capitalize(bankrupt.filing_type)}
								title="Filing Type"
			 /> : null )}

						{(_.has(bankrupt, 'filer_type') ?
							<SimpleRow
								key={uuid.v4()}
								content={_.capitalize(bankrupt.filer_type)}
								title="Filer Type"
			 /> : null )}

						{(_.has(bankrupt, 'filing_jurisdiction') ?
							<SimpleRow
								key={uuid.v4()}
								content={bankrupt.filing_jurisdiction}
								title="Filing Jurisdiction"
			 /> : null )}

						{(_.has(bankrupt, 'category') ?
							<SimpleRow
								key={uuid.v4()}
								content={bankrupt.category}
								title="Category"
			 /> : null )}

						{(_.has(bankrupt, 'original_chapter') ?
							<SimpleRow
								key={uuid.v4()}
								content={bankrupt.original_chapter}
								title="Bankruptcy Chapter"
			 /> : null )}

						{(_.has(bankrupt, 'court') ?
							<SimpleRow
								key={uuid.v4()}
								content={bankrupt.court}
								title="Court"
			 /> : null )}

						{(_.has(bankrupt, 'court_code') ?
							<SimpleRow
								key={uuid.v4()}
								content={bankrupt.court_code}
								title="Court Code"
			 /> : null )}

						{(_.has(bankrupt, 'court_location') ?
							<SimpleRow
								key={uuid.v4()}
								content={bankrupt.court_location}
								title="Court Location"
			 /> : null )}

						{(_.has(bankrupt, 'judge_identification') ?
							<SimpleRow
								key={uuid.v4()}
								content={bankrupt.judge_identification}
								title="Judge Identification"
			 /> : null )}

						{(_.has(bankrupt, 'disposition') ?
							<SimpleRow
								key={uuid.v4()}
								content={bankrupt.disposition}
								title="Disposition"
			 /> : null )}

						{(_.has(bankrupt, 'self_represented') ?
							<SimpleRow
								key={uuid.v4()}
								content={bankrupt.self_represented}
								title="Self Represented"
			 /> : null )}

						{(_.has(bankrupt, 'assets_for_unsecured') ?
							<SimpleRow
								key={uuid.v4()}
								content={bankrupt.assets_for_unsecured === 'Y' ? 'Yes' : 'No'}
								title="Assets For Unsecured"
			 /> : null )}

						{(_.has(bankrupt, 'status_history') ?
							<SimpleRow
								key={uuid.v4()}
								content={`${_.capitalize(bankrupt.status_history[0].type)} on ${moment(`${bankrupt.status_history[0].date.month}/${bankrupt.status_history[0].date.day}/${bankrupt.status_history[0].date.year}`, 'MM/DD/YYYY').format('LL')}`}
								title="Status History"
			 /> : null )}

						{(_.has(bankrupt, 'comments') ?
							<SimpleRow
								key={uuid.v4()}
								content={`${_.capitalize(bankrupt.comments[0].description)} on ${moment(`${bankrupt.comments[0].filing_date.month}/${bankrupt.comments[0].filing_date.day}/${bankrupt.comments[0].filing_date.year}`, 'MM/DD/YYYY').format('LL')}`}
								title="Comments"
			 /> : null )}

						{(!_.isEmpty(bankrupt.debtors) ?
							_.map(bankrupt.debtors, (debtor) => {
								let phone = !_.isNull(debtor.phones) ? debtor.phones[0].display : null;
								let location = debtor.locations[0].address.display ? debtor.locations[0].address.display : null;

								return (
									<SimpleInline
										key={uuid.v4()}
										title={['Debtor', 'Debtor\'s Address', 'Debtor\'s Phone Number' ]}
										contents={[`${debtor.names[0].first} ${debtor.names[0].last}`, location, phone]}
				 />
								);
							})
						: null )}

						{(!_.isEmpty(bankrupt.attorneys) ?
							_.map(bankrupt.attorneys, (attorney) => {
								let phone = !_.isNull(attorney.phones) ? attorney.phones[0].display : null;
								let location = attorney.locations[0].address.display ? attorney.locations[0].address.display : null;

								if(!attorney.names[0].first) {
									return true;
								}

								return (
									<SimpleInline
										key={uuid.v4()}
										title={['Attorney', 'Attorney\'s Address', 'Attorney\'s Phone Number' ]}
										contents={[`${attorney.names[0].first} ${attorney.names[0].last}`, location, phone]}
				 />
								);
							})
						: null )}

						{(!_.isEmpty(bankrupt.trustees) ?
							_.map(bankrupt.trustees, (trustee) => {
								let phone = !_.isNull(trustee.phones) ? trustee.phones[0].display : null;
								let location = trustee.locations[0].address.display ? trustee.locations[0].address.display : null;

								if(!trustee.names[0].first) {
									return true;
								}

								return (
									<SimpleInline
										key={uuid.v4()}
										title={['Trustee', 'Trustee\'s Address', 'Trustee\'s Phone Number' ]}
										contents={[`${trustee.names[0].first} ${trustee.names[0].last}`, location, phone]}
				 />
								);
							})
						: null )}
					</div>
				)) }
			</section>
		</div>
	);
};

Bankruptcies.propTypes = {
	bankruptcies: React.PropTypes.array.isRequired
};

export default Bankruptcies;
