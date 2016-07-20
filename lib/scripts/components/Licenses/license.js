import constants from '../../constants/pubRecConstants';
import React from 'react';
import SimpleRow from '../Shared/SimpleRow';

const LicenseColumn = (props) => {
	return (
		<div className='table row'>
			<div className='widget'>
				<h4>{props.label}</h4>
			</div>

			<div className='content content-full'>
				<ul>
					{ props.licenses.map((license, i) =>
						<li key={i}>
							<ul>
							{license.certificates.map((certificate, a) => 
								<li key={a}>

									<SimpleRow content={license.name.display} title="Name" />
									<SimpleRow content={license.address.display} title="Address" />
									<SimpleRow content={certificate.ratings} title="Ratings" />
									<SimpleRow content={certificate.level} title="Level" />
									<SimpleRow content={certificate.type} title="Type" />
								</li>
								)}

							</ul>
						</li>
					) }
				</ul>
			</div>
		</div>
	);
}

LicenseColumn.propTypes = {
	licenses: React.PropTypes.array.isRequired
}

export default LicenseColumn;
