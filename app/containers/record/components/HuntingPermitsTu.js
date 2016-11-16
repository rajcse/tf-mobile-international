import React from 'react';
import _ from 'lodash';
import Svg from 'components/svg/Svg';
import constants from 'constants/pubRecConstants';
import { titleCase } from 'utils/libs';
import SimpleRow from 'components/SimpleRow';

const HuntingPermitsTu = (props) => {

	let { huntingPermitsTu } = props;

	return (
		<div className="hunting-fishing-container license-group">
			<div className="label label-full">
				<h3 className="subsection-title premium"><Svg svg="premiumIconSmall" style={{width: 10}} className="title-icon" /> Possible Hunting Permits</h3>
			</div>
			{ huntingPermitsTu.map((huntingPermit, i) => {
				const holderName = _.get(huntingPermit.holder, 'names[0]');

				return (
					<div className="document license-individual" key={i}>
						{ holderName &&
							<SimpleRow
								title="Issued To"
								content={titleCase(`${holderName.first} ${holderName.last}`)}
						    /> }

						{ huntingPermit.permit_number &&
							<SimpleRow
								title="Permit Number"
								content={huntingPermit.permit_number}
							/> }

						{ huntingPermit.issue_date && huntingPermit.issue_date.month > 0 &&
							<SimpleRow
								title="Issued"
								content={`${constants.months[huntingPermit.issue_date.month]} ${huntingPermit.issue_date.day}, ${huntingPermit.issue_date.year}`}
							/> }

						{ huntingPermit.expiry_date &&
							<SimpleRow
								title="Expires"
								content={`${constants.months[huntingPermit.expiry_date.month]} ${huntingPermit.expiry_date.day}, ${huntingPermit.expiry_date.year}`}
							/> }
					</div>
				);
			})}
		</div>
	);
};

HuntingPermitsTu.propTypes = {
	huntingPermitsTu: React.PropTypes.array.isRequired
};

export default HuntingPermitsTu;
