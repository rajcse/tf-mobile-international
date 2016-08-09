import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';

import SimpleRow from '../Shared/SimpleRow';

const LicenseColumn = (props) => {
	let { licenses, label } = props;

	return (
		<div className='license-container'>
			{ licenses.map((license, index) => (
				<div className='license widget' key={index}>
					<h3 className='title'>{label} Information</h3>
					<SimpleRow
						key={`name-${uuid.v1()}`}
						content={license.name.display}
						title="Name"
					/>

					<SimpleRow
						key={`address-${uuid.v1()}`}
						content={license.address.display}
						title="Address"
					/>

					{ _.isEmpty(license.certificates) ? null :
						license.certificates.map((certificate, index) => (
							<div className='certificates' key={index}>
								<h4 className='title'>Certificate</h4>

								{_.isEmpty(certificate.ratings) ? null :
									<SimpleRow
										key={`rating-${uuid.v1()}`}
										content={certificate.ratings}
										title="Ratings"
									/>
								}

								{_.isEmpty(certificate.level) ? null :
									<SimpleRow
										key={`level-${uuid.v1()}`}
										content={certificate.level}
										title="Level"
									/>
								}

								{_.isEmpty(certificate.type) ? null :
									<SimpleRow
										key={`type-${uuid.v1()}`}
										content={certificate.type}
										title="Type"
									/>
								}
							</div>
						)
					)}
				</div>
			)) }
		</div>
	);
}

LicenseColumn.propTypes = {
	licenses: React.PropTypes.array.isRequired
}

export default LicenseColumn;
