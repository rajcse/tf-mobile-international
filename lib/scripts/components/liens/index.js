import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';
import Sticky from 'react-stickynode';

const Liens = (props) => {
	let { liens } = props;

	return (
		<div className="multi-container">
			<section id="liens" className="widget multi-widget premium">
				<Sticky>
					<h2 className="title">Liens And Judgements</h2>
				</Sticky>
				{ liens.map((lien, index) => (
					<div className="lien widget" key={index}>
						<h3 className="title">
							Lien Filed on {`${constants.months[lien.origin_filing_date.month]} ${lien.origin_filing_date.day}, ${lien.origin_filing_date.year}`}
						}
						</h3>

						{ lien.origin_filing_number ?
							<h4 className="sub-title">
								Filing # {lien.origin_filing_number}
							</h4>
						: null }

						{(lien.eviction) ?
							<SimpleRow
								key={`eviction-${uuid.v4()}`}
								content={lien.eviction ? 'Yes' : 'No'}
								title="Eviction"
							/> : null
						}

						{(lien.multiple_defendant) ?
							<SimpleRow
								key={`defendant-${uuid.v4()}`}
								content={lien.multiple_defendant ? 'Yes' : 'No'}
								title="Multiple Defendant"
							/> : null
						}
						
						{(lien.amount) ?
							<SimpleRow
								key={`amount-${uuid.v4()}`}
								content={'$' + lien.amount}
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
						<hr/>
						{_.isEmpty(lien.filings) ? null :
							<div id="filing">
								<h3>Filing Information</h3>
								{ lien.filings.map((filing) => (
									<div>
									<SimpleRow
										key={`filing-${uuid.v4()}`}
										content={filing.number}
										title="Filing Number"
									/>
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
									{(filing.agency_location) ?
										<SimpleRow
											key={`filing_agency_location-${uuid.v4()}`}
											content={filing.agency_county +  filing.agency_state}
											title="Filing Agency Location"
										/> : null
									}
									{(filing.release_date) && !_.isNull(filing.release_date) ?
										<SimpleRow
											key={`release-${uuid.v4()}`}
											content={`${constants.months[filing.release_date.month]} ${filing.release_date.day}, ${filing.release_date.year}`}
											title="Release Date"
										/> : null
									}
									
									</div>
								)) }

							</div>
						}
						<hr/>
						{_.isEmpty(lien.debtors) ? null :
							<div id="debtors">
								<h3>Debtor Information</h3>
								{ lien.debtors.map((debtor) => (
									<div>
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
									{(_.has(debtor,'addresses[0]')) ?
									<SimpleRow
										key={`debtor-addresse-${uuid.v4()}`}
										content={(_.has(debtor,('addresses[0].street_number')) ? debtor.addresses[0].street_number : '') 
											+ ' ' + (_.has(debtor,('addresses[0].street_name')) ? debtor.addresses[0].street_name  : '')
											+ ' ' + (_.has(debtor,('addresses[0].street_suffix')) ? debtor.addresses[0].street_suffix  : '')
											+ (_.has(debtor,('addresses[0].city')) ? (', ' + debtor.addresses[0].city)  : '')
											+ (_.has(debtor,('addresses[0].state')) ? (', ' + debtor.addresses[0].state)  : '')
											+ ' ' + (_.has(debtor,('addresses[0].zip5')) ? debtor.addresses[0].zip5  : '') }
										title="Address"
									/> : null
									}				
									<hr/>				
									</div>
								)) }

							</div>
						}
						<hr/>
						{_.isEmpty(lien.creditors) ? null :
							<div id="creditors">
								<h3>Creditor Information</h3>
								{ lien.creditors.map((creditor) => (
									<div>
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
									<hr/>
									</div>
								)) }

							</div>
						}
					</div>
				)) }
			</section>
		</div>
	);
};

Liens.propTypes = {
	liens: React.PropTypes.array.isRequired
};

export default Liens;
