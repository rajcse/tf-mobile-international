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
