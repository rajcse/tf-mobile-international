import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import uuid from 'uuid';
import Sticky from 'react-stickynode';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';
import SimpleInline from '../shared/SimpleInline';
import {STATES} from '../../utils/states';

function getFileDate(date) {
	if(_.isNull(date)) {
		return 'Bankruptcy Record';
	}

	let formattedDate = constants.months[date.month] + ' ' + date.day + ' ' + date.year;

	return `Filing Date - ${formattedDate}`;
}

const Bankruptcies = (props) => {
	let {
		bankruptcies,
		isPremium,
		name,
		showPremiumUpsell,
		recordID
	} = props;

	if (!isPremium) {
		return (
			<section id="bankruptcies" className="widget">
				<Sticky>
					<h2 className="title">Bankruptcies, Judgments, Liens</h2>
				</Sticky>

				<div className="document">
					<div className="label">
						<h4>Additional Info</h4>
					</div>

					<p>
						Is {name} trustworthy? Bankruptcies, judgements and liens can only be revealed after you give authorization.
						Click the button below to have access to available bankruptcy information—in just moments.
					</p>

					<p>
						<button className="btn btn-upgrade" onClick={() => showPremiumUpsell(recordID)}>View Premium Data</button>
					</p>
				</div>
			</section>
		);
	}

	if (isPremium && bankruptcies.length === 0) {
		return null;
	}

	return (
		<section id="bankruptcies" className="widget premium">
			<Sticky>
				<h2 className="title">Possible Bankruptcies</h2>
			</Sticky>
			{ bankruptcies.map((bankrupt, index) => (
				<div className="document bankruptcy-individual" key={index}>
					<div className="label label-full">
						<h3 className="document-title">{getFileDate(bankrupt.file_date)}</h3>
					</div>

					{bankrupt.case_number ?
						<SimpleRow
							key={uuid.v4()}
							content={bankrupt.case_number}
							title="Case Number"
						/> : null }

					{bankrupt.chapter ?
						<SimpleRow
							key={uuid.v4()}
							content={bankrupt.chapter}
							title="Bankruptcy Chapter"
						/> : null }

					{!bankrupt.chapter && bankrupt.original_chapter ?
						<SimpleRow
							key={uuid.v4()}
							content={bankrupt.original_chapter}
							title="Bankruptcy Chapter"
						/> : null }

					{bankrupt.filing_type ?
						<SimpleRow
							key={uuid.v4()}
							content={_.capitalize(bankrupt.filing_type)}
							title="Filing Type"
						/> : null }

					{bankrupt.filer_type && bankrupt.filing_type !== bankrupt.filer_type ?
						<SimpleRow
							key={uuid.v4()}
							content={_.capitalize(bankrupt.filer_type)}
							title="Filer Type"
						/> : null }

					{bankrupt.filing_status ?
						<SimpleRow
							key={uuid.v4()}
							content={_.capitalize(bankrupt.filing_status)}
							title="Filing Status"
						/> : null }

					{bankrupt.filing_jurisdiction ?
						<SimpleRow
							key={uuid.v4()}
							content={STATES[bankrupt.filing_jurisdiction]}
							title="Filing Jurisdiction"
						/> : null }

					{bankrupt.category ?
						<SimpleRow
							key={uuid.v4()}
							content={bankrupt.category}
							title="Category"
						/> : null }

					{bankrupt.disposition ?
						<SimpleRow
							key={uuid.v4()}
							content={bankrupt.disposition}
							title="Disposition"
						/> : null }

					{bankrupt.discharge_date ?
						<SimpleRow
							key={uuid.v4()}
							content={`${constants.months[bankrupt.discharge_date.month]} ${bankrupt.discharge_date.day}, ${bankrupt.discharge_date.year}`}
							title="Discharge Date"
						/> : null }

					{bankrupt.court ?
						<SimpleRow
							key={uuid.v4()}
							content={bankrupt.court}
							title="Court"
						/> : null }

					{bankrupt.court_code ?
						<SimpleRow
							key={uuid.v4()}
							content={bankrupt.court_code}
							title="Court Code"
						/> : null }

					{bankrupt.court_location ?
						<SimpleRow
							key={uuid.v4()}
							content={bankrupt.court_location}
							title="Court Location"
						/> : null }

					{bankrupt.meeting && bankrupt.meeting.address ?
						<SimpleRow
							key={uuid.v4()}
							content={bankrupt.meeting.address}
							title="Court Room"
						/> : null }

					{bankrupt.meeting && bankrupt.meeting.date ?
						<SimpleRow
							key={uuid.v4()}
							content={`${constants.months[bankrupt.meeting.date.month]} ${bankrupt.meeting.date.day}, ${bankrupt.meeting.date.year}`}
							title="Court Date"
						/> : null }

					{bankrupt.meeting && bankrupt.meeting.time ?
						<SimpleRow
							key={uuid.v4()}
							content={moment(`${bankrupt.meeting.time}`, 'hhmm').format('H:mm')}
							title="Court Hearing Time"
						/> : null }

					{bankrupt.judge_identification ?
						<SimpleRow
							key={uuid.v4()}
							content={bankrupt.judge_identification}
							title="Judge Identification"
						/> : null }

					{bankrupt.judge_name ?
						<SimpleRow
							key={uuid.v4()}
							content={bankrupt.judge_name}
							title="Presiding Judge"
						/> : null }

					{bankrupt.self_represented ?
						<SimpleRow
							key={uuid.v4()}
							content={bankrupt.self_represented}
							title="Self Represented"
						/> : null }

					{bankrupt.assets_for_unsecured ?
						<SimpleRow
							key={uuid.v4()}
							content={bankrupt.assets_for_unsecured === 'Y' ? 'Yes' : 'No'}
							title="Assets For Unsecured"
						/> : null }

					{bankrupt.status_history ?
						<SimpleRow
							key={uuid.v4()}
							content={
								`${_.capitalize(bankrupt.status_history[0].type)} on
								${moment({month: bankrupt.status_history[0].date.month - 1, day: bankrupt.status_history[0].date.day, year: bankrupt.status_history[0].date.year}).format('LL')}`
							}
							title="Status History"
						/> : null }

					{ _.has(bankrupt,'comments[0].description') && _.has(bankrupt,'comments[0].filing_date.month') ?
						<SimpleRow
							key={uuid.v4()}
							content={
								`${constants.months[bankrupt.comments[0].filing_date.month]} ${bankrupt.comments[0].filing_date.day}, ${bankrupt.comments[0].filing_date.year} - ${bankrupt.comments[0].description}`
							}
							title="Comments"
						/> : null }

					{bankrupt.debtors ?
						<div className="subgroup">
							<h3>Debtors</h3>
							{_.map(bankrupt.debtors, (debtor) => {
								let phone = _.get(debtor,'phones[0].display', null);
								let location = _.get(debtor,'locations[0].address.display', null);

								return (
									<SimpleInline
										key={uuid.v4()}
										title={['Name', 'Address', 'Phone Number' ]}
										contents={[`${debtor.names[0].first} ${debtor.names[0].last}`, location, phone]}
									/>
								);
							})}
						</div>
					: null }

					{bankrupt.attorneys ?
						<div className="subgroup">
							<h3>Attorneys</h3>
							{_.map(bankrupt.attorneys, (attorney) => {
								let phone = _.get(attorney,'phones[0].display', null);
								let location = _.get(attorney, 'locations[0].address.display', null);
								let email = _.get(attorney, 'emails[0].address', null);
								let name = _.get(attorney,'names[0].first', '') + ' ' + _.get(attorney,'names[0].last', '');
								if(!attorney.names) {
									return true;
								}

								return (
									<SimpleInline
										key={uuid.v4()}
										title={['Attorney', 'Attorney\'s Address', 'Attorney\'s Phone Number', 'Attorney\'s Email' ]}
										contents={[name, location, phone, email]}
									/>
								);
							})}
						</div>
					: null }

					{bankrupt.trustees ?
						<div className="subgroup">
							<h3>Trustees</h3>
							{_.map(bankrupt.trustees, (trustee) => {
								let phone = trustee.phones ? trustee.phones[0].display : null;
								let location = _.has(trustee, 'locations[0].address.display') && trustee.locations[0].address.display ? trustee.locations[0].address.display : null;

								if(!trustee.names) {
									return true;
								}

								return (
									<SimpleInline
										key={uuid.v4()}
										title={['Trustee', 'Trustee\'s Address', 'Trustee\'s Phone Number' ]}
										contents={[`${trustee.names[0].first} ${trustee.names[0].last}`, location, phone]}
									/>
								);
							})}
						</div>
					: null }
				</div>
			)) }
		</section>
	);
};

Bankruptcies.propTypes = {
	bankruptcies: React.PropTypes.array,
	isPremium: React.PropTypes.bool,
	name: React.PropTypes.string,
	showPremiumUpsell: React.PropTypes.func,
	recordID: React.PropTypes.string
};

export default Bankruptcies;
