import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';
import Sticky from 'react-stickynode';

import * as libs from '../../utils/libs';

function getFileDate(date) {
	if(!date) {
		return 'Lien';
	}

	let formattedDate = constants.months[date.month] + ' ' + date.day + ' ' + date.year;

	return `Filing Date - ${formattedDate}`;
}

const Liens = (props) => {
	let { liens } = props;
	return (
		<section id="liens" className="widget premium">
			<Sticky>
				<h2 className="title">Possible Liens</h2>
			</Sticky>
			{ liens.map((lien, index) => (
				<div className="document lien-individual" key={uuid.v4()}>
					<div className="label label-full">
						<h3 className="document-title">{getFileDate(lien.filing_date)}</h3>
					</div>

					{ lien.courtcase_number ?
						<h4 className="sub-title">
							Case # {lien.courtcase_number}
						</h4>
					: null }

					{ lien.filing_type ?
						<SimpleRow
							content={lien.filing_type}
							title="Filing Type"
						/> : null
					}

					{ lien.total_lien_amount ?
						<SimpleRow
							content={libs._getFormattedCurrency(lien.total_lien_amount)}
							title="Lien Amount"
						/> : null
					}

					{ _.get(lien,'address.display') ?
						<SimpleRow
							key={`eviction-${uuid.v4()}`}
							content={lien.address.display}
							title="Address"
						/> : null
					}

					{ _.get(lien,'name.first') || _.get(lien,'name.last')?
						<SimpleRow
							content={`${_.get(lien,'name.first')} ${_.get(lien,'name.last')}`}
							title="Debtor Name"
						/> : null
					}

					{ _.get(lien,'plaintiff_name.first') || _.get(lien,'plaintiff_name.last')?
						<SimpleRow
							content={`${_.get(lien,'plaintiff_name.first')} ${_.get(lien,'plaintiff_name.last')}`}
							title="Plaintiff Name"
						/> : null
					}

					{(lien.release_date && lien.release_date.month) ?
						<SimpleRow
							content={constants.months[lien.release_date.month] + ' ' + lien.release_date.day + ' ' + lien.release_date.year}
							title="Release Date"
						/> : null
					}

					{ _.get(lien,'court.business_name') ?
						<div className="subgroup subgroup-singular">
							<h3>Court Information</h3>

							{ _.get(lien,'court.business_name') ?
								<SimpleRow
									content={lien.court.business_name}
									title="Name"
								/> : null
							}

							{ _.get(lien,'court.address.display') ?
								<SimpleRow
									content={lien.court.address.display}
									title="Address"
								/> : null
							}

							{ _.get(lien,'court.court_id') ?
								<SimpleRow
									content={lien.court.court_id}
									title="Court ID"
								/> : null
							}

							{ _.get(lien,'court.phone') ?
								<SimpleRow
									content={lien.court.phone}
									title="Phone Number"
								/> : null
							}

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
