import React from 'react';
import SimpleRow from 'components/SimpleRow';
import Svg from 'components/svg/Svg';
import moment from 'moment';
import uuid from 'uuid';
import _ from 'lodash';

const FAALicenses = (props) => {

	let { faaLicenses } = props;
	let content = [];
	let containsPremiumData = false;

	faaLicenses.map((faaLicense, i) => {
		let singleLicense = [];
		let certificateGroup = [];

		if (faaLicense['@provider'] == 'local.person.lexis.comp') {
			containsPremiumData = true;
		}

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

		if (faaLicense.class) {
			singleLicense.push(
				<SimpleRow
					key={uuid.v4()}
					content={faaLicense.class}
					title="Class"
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
				if (certificate.type && certificate.type.length > 1) {
					singleCertificate.push(
						<SimpleRow
							key={uuid.v4()}
							content={certificate.type}
							title="Certificate Type"
						/>
					);
				}

				if (certificate.type_desc && certificate.type_desc !== certificate.type) {
					singleCertificate.push(
						<SimpleRow
							key={uuid.v4()}
							content={certificate.type_desc}
							title="Certificate Description"
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

				if (certificate.level && certificate.level.length > 1) {
					singleCertificate.push(
						<SimpleRow
							key={uuid.v4()}
							content={certificate.level}
							title="Level"
						/>
					);
				}

				certificateGroup.push(
					<div className="faa-certificate" key={uuid.v4()}>
						{singleCertificate}
					</div>
				);

			});
			singleLicense.push(
				<div className="subgroup" key={uuid.v4()}>
					<h3>Associated Certificates</h3>
					{certificateGroup}
				</div>
			);
		}
		// add the completed singleLicense array to the main content array
		content.push(
			<div className="document license-individual" key={uuid.v4()}>
				{singleLicense}
			</div>
		);
	});

	return (
		<div className="faa-licenses-container license-group">
			<div className="label label-full">
				<h3 className={containsPremiumData ? 'premium' + ' subsection-title' : 'subsection-title'}>
					{containsPremiumData ? <Svg svg="premiumIconSmall" style={{width: 10}} className="title-icon" /> : null }
					Possible FAA Licenses
				</h3>
			</div>
			{ content }
		</div>
	);
};

FAALicenses.propTypes = {
	faaLicenses: React.PropTypes.array.isRequired
};

export default FAALicenses;
