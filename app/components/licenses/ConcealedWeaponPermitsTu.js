import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { titleCase } from '../../utils/libs';
import SimpleRow from '../shared/SimpleRow';

const ConcealedWeaponPermitsTu = (props) => {

	let { concealedWeaponPermitsTu } = props;

	return (
		<div className="weapon-permits-container license-group">
			<div className="label label-full">
				<h3 className="subsection-title premium">Possible Concealed Weapon Permits</h3>
			</div>
			{ concealedWeaponPermitsTu.map((weaponPermit, i) => {
				const holderName = _.get(weaponPermit.holder, 'names[0]');
				
				return (
					<div className="document license-individual" key={i}>
						{ holderName &&
							<SimpleRow
								title="Issued To"
								content={titleCase(`${holderName.first} ${holderName.last}`)}
							/> }
						
						{ weaponPermit.permit_number &&
							<SimpleRow
								title="Permit Number"
								content={weaponPermit.permit_number}
							/> }

						{ weaponPermit.issue_date &&
							<SimpleRow
								title="Issued"
								content={moment(weaponPermit.issue_date).format('MMM DD, YYYY')}
							/> }

						{ weaponPermit.expiry_date &&
							<SimpleRow
								title="Expires"
								content={moment(weaponPermit.expiry_date).format('MMM DD, YYYY')}
							/> }
					</div>
				);
			})}
		</div>
	);
};

ConcealedWeaponPermitsTu.propTypes = {
	concealedWeaponPermitsTu: React.PropTypes.array.isRequired
};

export default ConcealedWeaponPermitsTu;
