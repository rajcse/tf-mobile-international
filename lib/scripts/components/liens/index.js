import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import numeral from 'numeral';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';
import Sticky from 'react-stickynode';

function getFileDate(date) {
	if(!date) {
		return 'Lien or Judgement';
	}

	let formattedDate = constants.months[date.month] + ' ' + date.day + ' ' + date.year;

	return `Filing Date - ${formattedDate}`;
}

const Liens = (props) => {
	let { liens } = props;
	return (
		<section id="liens" className="widget premium">
			<Sticky>
				<h2 className="title">Liens And Judgements</h2>
			</Sticky>
			{ liens.map((lien, index) => (
				<div className="lien lien-individual" key={index}>
					<div className="label label-full">
						<h3 className="subsection-title premium">{getFileDate(lien.origin_filing_date)}</h3>
					</div>

					{ lien.origin_filing_number ?
						<h4 className="sub-title">
							Filing # {lien.origin_filing_number}
						</h4>
					: null }

					{(lien.eviction) ?
						<SimpleRow
							key={`eviction-${uuid.v4()}`}
							content={lien.eviction && lien.eviction.toLowerCase() === 'y' ? 'Yes' : 'No'}
							title="Eviction"
						/> : null
					}

					{(lien.case_number) ?
						<SimpleRow
							content={lien.case_number}
							title="Case Number"
						/> : null
					}

					{(lien.filing_status) ?
						<SimpleRow
							key={`eviction-${uuid.v4()}`}
							content={lien.filing_status}
							title="Filing Status"
						/> : null
					}

					{(lien.filing_jurisdiction_name) ?
						<SimpleRow
							content={lien.filing_jurisdiction_name}
							title="Filing State"
						/> : null
					}

					{(lien.amount) ?
						<SimpleRow
							key={`amount-${uuid.v4()}`}
							content={numeral(lien.amount).format('$ 0,0[.]00')}
							title="Amount"
						/> : null
					}
					{(lien.legal_lot) ?
						<SimpleRow
							key={`legal_lot-${uuid.v4()}`}
							content={lien.legal_lot}
							title="Legal Lot"
						/> : null
					}
					{(lien.legal_block) ?
						<SimpleRow
							key={`legal_block-${uuid.v4()}`}
							content={lien.legal_block}
							title="Legal Block"
						/> : null
					}

					{(lien.tms_id) ?
						<SimpleRow
							key={`tms-${uuid.v4()}`}
							content={lien.tms_id}
							title="TMS ID"
						/> : null
					}
					{(lien.company_name) ?
						<SimpleRow
							key={`company_name-${uuid.v4()}`}
							content={lien.company_name}
							title="Creditor"
						/> : null
					}

					{(lien.multiple_defendant) ?
						<SimpleRow
							key={`defendant-${uuid.v4()}`}
							content={lien.multiple_defendant ? 'Yes' : 'No'}
							title="Multiple Defendants"
						/> : null
					}

					{(lien.release_date && lien.release_date.month) ?
						<SimpleRow
							content={constants.months[lien.release_date.month] + ' ' + lien.release_date.day + ' ' + lien.release_date.year}
							title="Release Date"
						/> : null
					}

					{ lien.filings ?
						<div className="subgroup">
							<h3>Filing Information</h3>
							{ lien.filings.map((filing) => (
								<div key={uuid.v4()}>

									{ filing.number ?
										<SimpleRow
											key={`filing-${uuid.v4()}`}
											content={filing.number}
											title="Filing Number"
										/> : null
									}

									{(filing.type) ?
										<SimpleRow
											key={`filing_Type-${uuid.v4()}`}
											content={filing.type}
											title="Filing Type"
										/> : null
									}

									{(filing.agency) ?
										<SimpleRow
											key={`filing_agency-${uuid.v4()}`}
											content={filing.agency}
											title="Filing Agency"
										/> : null
									}

									{(filing.agency_county || filing.agency_state) ?
										<SimpleRow
											key={`filing_agency_location-${uuid.v4()}`}
											content={filing.agency_county + ' ' + filing.agency_state}
											title="Filing Agency Location"
										/> : null
									}

									{(filing.release_date) ?
										<SimpleRow
											key={`release-${uuid.v4()}`}
											content={`${constants.months[filing.release_date.month]} ${filing.release_date.day}, ${filing.release_date.year}`}
											title="Release Date"
										/> : null
									}

									{(filing.judge_satisfied_date) ?
										<SimpleRow
											key={`release-${uuid.v4()}`}
											content={`${constants.months[filing.judge_satisfied_date.month]} ${filing.judge_satisfied_date.day}, ${filing.judge_satisfied_date.year}`}
											title="Judgement Satisfied"
										/> : null
									}
								</div>
							)) }
						</div> : null
					}

					{ lien.debtors ?
						<div className="subgroup">
							<h3>Debtors</h3>
							{ lien.debtors.map((debtor) => (
								<div key={uuid.v4()}>
									{(debtor.origin_name) ?
										<SimpleRow
											key={`debtor-origin_name-${uuid.v4()}`}
											content={debtor.origin_name}
											title="Name"
										/> : null
									}
									{(debtor.unique_id) ?
										<SimpleRow
											key={`debtor-unique_id-${uuid.v4()}`}
											content={debtor.unique_id}
											title="ID"
										/> : null
									}
									{(debtor.person_filter_id) ?
										<SimpleRow
											key={`debtor-person_filter_id-${uuid.v4()}`}
											content={debtor.person_filter_id}
											title="Person ID"
										/> : null
									}
									{(_.has(debtor,'addresses[0]') && debtor.addresses[0]) ?
										<SimpleRow
											key={`debtor-addresse-${uuid.v4()}`}
											content={`${debtor.addresses[0].street_number} ${debtor.addresses[0].street_pre_direction } ${debtor.addresses[0].street_name } ${debtor.addresses[0].street_suffix } ${debtor.addresses[0].unit_designation } ${debtor.addresses[0].unit_number } ${debtor.addresses[0].city } ${debtor.addresses[0].state } ${debtor.addresses[0].zip5 }`
												}
												title="Address"
										/> : null
									}
									<hr/>
								</div>
							)) }
						</div> : null
					}

					{ lien.creditors ?
						<div className="subgroup">
							<h3>Creditors</h3>
							{ lien.creditors.map((creditor) => (
								<div key={uuid.v4()}>
									{(creditor.name) ?
										<SimpleRow
											key={`creditor-origin_name-${uuid.v4()}`}
											content={creditor.name}
											title="Name"
										/> : null
									}
									{(_.has(creditor,'parsed_parties[0].person_filter_id')) ?
										<SimpleRow
											key={`creditor-person_filter_id-${uuid.v4()}`}
											content={creditor.parsed_parties[0].person_filter_id}
											title="Creditor ID"
										/> : null
									}

								</div>
							)) }
						</div> : null
					}
				</div>
			)) }
		</section>
	);
};

Liens.propTypes = {
	liens: React.PropTypes.array.isRequired
};

export default Liens;
