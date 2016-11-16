import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import constants from 'constants/pubRecConstants';
import SimpleRow from 'components/SimpleRow';
import Sticky from 'react-stickynode';
import {STATES} from 'utils/states';

function getFileDate(date) {
	if(!date) {
		return 'eviction';
	}

	let formattedDate = constants.months[date.month] + ' ' + date.day + ' ' + date.year;

	return `Filing Date - ${formattedDate}`;
}

const Evictions = (props) => {
	let { evictions } = props;
	return (
		<section id="evictions" className="widget premium">
			<Sticky>
				<h2 className="title">Possible Evictions</h2>
			</Sticky>
			{ evictions.map((eviction, index) => (
				<div className="document eviction-individual" key={uuid.v4()}>
					<div className="label label-full">
						<h3 className="document-title">{getFileDate(eviction.filing_date.date)}</h3>
					</div>

					{ eviction.case_number ?
						<h4 className="sub-title">
							Case # {eviction.case_number}
						</h4>
					: null }

					{ eviction.filing_type ?
						<SimpleRow
							content={eviction.filing_type}
							title="Filing Type"
						/> : null
					}

					{ eviction.filing_state ?
						<SimpleRow
							content={STATES[eviction.filing_state]}
							title="Filing Location"
						/> : null
					}

					{ _.get(eviction,'address.display') ?
						<SimpleRow
							key={`eviction-${uuid.v4()}`}
							content={eviction.address.display}
							title="Address"
						/> : null
					}

					{ _.get(eviction,'name.first') || _.get(eviction,'name.last')?
						<SimpleRow
							content={`${_.get(eviction,'name.first')} ${_.get(eviction,'name.last')}`}
							title="Defendent Name"
						/> : null
					}

					{ _.get(eviction,'plaintiff_name.first') || _.get(eviction,'plaintiff_name.last')?
						<SimpleRow
							content={`${_.get(eviction,'plaintiff_name.first')} ${_.get(eviction,'plaintiff_name.last')}`}
							title="Plaintiff Name"
						/> : null
					}

					{ eviction.unlawful_detainer ?
						<SimpleRow
							content={eviction.unlawful_detainer}
							title="Unlawful Detainer"
						/> : null
					}

				</div>
			)) }
		</section>
	);
};

Evictions.propTypes = {
	evictions: React.PropTypes.array.isRequired
};

export default Evictions;
