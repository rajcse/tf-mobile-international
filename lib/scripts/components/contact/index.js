import React from 'react';
import _ from 'lodash';

// Container Specific Component
import PhoneColumn from './phone';
import EmailColumn from './email';
import DefaultColumn from '../shared/DefaultColumn';

import uuid from 'uuid';

const ContactSection = (props) => {
	let content = [];
	let { phones, emails } = props;
	let previousNumbers = phones.filter(phone => phone.is_old !== true);
	let numbers = phones.filter(phone => phone.is_old === true);

	if (!_.isEmpty(numbers)) {
		content.push(
			<PhoneColumn
				key={'phones-' + uuid.v4()}
				numbers={numbers}
				title="Phone Numbers"
			/>
		);
	}

	if (!_.isEmpty(previousNumbers)) {
		content.push(
			<PhoneColumn
				key={'prev-phones-' + uuid.v4()}
				numbers={previousNumbers}
				title="Previous Phone Numbers"
			/>
		);
	}

	if (!_.isEmpty(emails)) {
		content.push(
			<EmailColumn
				key={'emails-' + uuid.v4()}
				emails={_.map(emails, 'address')}
			/>
		);
	}

	// Fallback Details
	let fallback = {
		title: `Our extensive public records search did not uncover contact records ${name}.`,
		content: `We scanned for ${name}'s name among hundreds of millions of records from local, state, and federal databases in all 50 states.`,
	};

	return(
		<section id="contact" className="widget">
			<h2 className="title">Contact Information</h2>
			{content.length > 0 ? content :
				<DefaultColumn
					name={name}
					icon="social"
					title={fallback.title}
					content={fallback.content}
					type="contact"
				/>
			}
		</section>
	);
};

ContactSection.propTypes = {
	phones: React.PropTypes.array,
	emails: React.PropTypes.array,
};

export default ContactSection;
