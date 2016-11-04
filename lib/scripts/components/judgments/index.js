import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';
import Sticky from 'react-stickynode';

import * as libs from '../../utils/libs';

function getFileDate(date) {
	if(!date) {
		return 'judgment';
	}

	let formattedDate = constants.months[date.month] + ' ' + date.day + ' ' + date.year;

	return `Filing Date - ${formattedDate}`;
}

const Judgments = (props) => {
	let { judgments } = props;
	return (
		<section id="judgments" className="widget premium">
			<Sticky>
				<h2 className="title">Possible Judgments</h2>
			</Sticky>
			{ judgments.map((judgment, index) => (
				<div className="document judgment-individual" key={uuid.v4()}>
					<div className="label label-full">
						<h3 className="document-title">{getFileDate(judgment.filing_date)}</h3>
					</div>

					{ judgment.courtcase_number ?
						<h4 className="sub-title">
							Case # {judgment.courtcase_number}
						</h4>
					: null }

					{ judgment.filing_type ?
						<SimpleRow
							content={judgment.filing_type}
							title="Filing Type"
						/> : null
					}

					{ judgment.filing_location ?
						<SimpleRow
							content={judgment.filing_location}
							title="Filing Location"
						/> : null
					}

					{ judgment.total_judgment_amount && judgment.total_judgment_amount != '0.00' ?
						<SimpleRow
							content={libs._getFormattedCurrency(judgment.total_judgment_amount)}
							title="judgment Amount"
						/> : null
					}

					{ _.get(judgment,'address.display') ?
						<SimpleRow
							key={`eviction-${uuid.v4()}`}
							content={judgment.address.display}
							title="Address"
						/> : null
					}

					{ _.get(judgment,'name.first') || _.get(judgment,'name.last')?
						<SimpleRow
							content={`${_.get(judgment,'name.first')} ${_.get(judgment,'name.last')}`}
							title="Defendent Name"
						/> : null
					}

					{ _.get(judgment,'plaintiff_name.first') || _.get(judgment,'plaintiff_name.last')?
						<SimpleRow
							content={`${_.get(judgment,'plaintiff_name.first')} ${_.get(judgment,'plaintiff_name.last')}`}
							title="Plaintiff Name"
						/> : null
					}

					{(judgment.release_date && judgment.release_date.month) ?
						<SimpleRow
							content={constants.months[judgment.release_date.month] + ' ' + judgment.release_date.day + ' ' + judgment.release_date.year}
							title="Release Date"
						/> : null
					}

					{ _.get(judgment,'court.business_name') ?
						<div className="subgroup subgroup-singular">
							<h3>Court Information</h3>

								{ _.get(judgment,'court.business_name') ?
									<SimpleRow
										content={judgment.court.business_name}
										title="Name"
									/> : null
								}

								{ _.get(judgment,'court.address.display') ?
									<SimpleRow
										content={judgment.court.address.display}
										title="Address"
									/> : null
								}

								{ _.get(judgment,'court.court_id') ?
									<SimpleRow
										content={judgment.court.court_id}
										title="Court ID"
									/> : null
								}

								{ _.get(judgment,'court.phone') ?
									<SimpleRow
										content={judgment.court.phone}
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

Judgments.propTypes = {
	judgments: React.PropTypes.array.isRequired
};

export default Judgments;
