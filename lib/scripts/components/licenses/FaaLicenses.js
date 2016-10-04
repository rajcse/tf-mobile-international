import constants from '../../constants/pubRecConstants';
import React from 'react';
import SimpleRow from '../shared/SimpleRow';
import moment from 'moment';
import uuid from 'uuid';
import _ from 'lodash';

const FAALicenses = (props) => {

	let { faaLicenses } = props;
	let content = [];

	faaLicenses.map((faaLicense, i) => {
		let singleLicense = [];
		let certificateGroup = [];
		if (_.has(faaLicense, 'name.display') && faaLicense.name.display) {
			singleLicense.push(
				<SimpleRow
					key={uuid.v4()}
					content={faaLicense.name.display}
					title="Name"
				/>
			);
		}	

		if (_.has(faaLicense, 'address.display') && faaLicense.address.display) {
			singleLicense.push(
				<SimpleRow
					key={uuid.v4()}
					content={faaLicense.address.display}
					title="Registered Address"
				/>
			);
		}	

		if (faaLicense.number) {
			singleLicense.push(
				<SimpleRow
					key={uuid.v4()}
					content={faaLicense.number}
					title="License Number"
				/>
			);
		}

		if (faaLicense.record_type) {
			singleLicense.push(
				<SimpleRow
					key={uuid.v4()}
					content={faaLicense.record_type}
					title="Record Type"
				/>
			);
		}


		if (faaLicense.date_expires_medical) {
			singleLicense.push(
				<SimpleRow
					key={uuid.v4()}
					content={moment(`${faaLicense.date_expires_medical.month}/${faaLicense.date_expires_medical.day}/${faaLicense.date_expires_medical.year}`, 'MM/DD/YYYY').format('LL')}
					title="Expiration Date"
				/>
			);
		}

		if (faaLicense.certificates && faaLicense.certificates.length) {
			// Loop through certificates within a license and build an array of content to be pushed into the singleLicense array
			faaLicense.certificates.map((certificate, i) => {
				let singleCertificate = [];
				if (certificate.type) {
					singleCertificate.push(
						<SimpleRow
							key={uuid.v4()}
							content={certificate.type}
							title="Certificate Type"
						/>
					);
				}
				if (certificate.ratings) {
					singleCertificate.push(
						<SimpleRow
							key={uuid.v4()}
							content={certificate.ratings}
							title="Certificate Rating"
						/>
					);
				}

				certificateGroup.push(
					<div className='faa-certificate' key={uuid.v4()}>
						{singleCertificate}
					</div>
				)

			});
			singleLicense.push(
				<div className='faa-certificate-group' key={uuid.v4()}>
					<h3>Associated Certificates</h3>
					{certificateGroup}
				</div>
			);
		}
		// add the completed singleLicense array to the main content array
		content.push(
			<div className='faa-license license-individual' key={uuid.v4()}>
				{singleLicense}
			</div>
		)
	});

	return (
		<div className='faa-licenses-container license-group'>
			<div className="label label-full">
				<h3 className="subsection-title">FAA Licenses</h3>
			</div>
			{ content }
		</div>
	);
}

FAALicenses.propTypes = {
	faaLicenses: React.PropTypes.array.isRequired,
}

export default FAALicenses;
