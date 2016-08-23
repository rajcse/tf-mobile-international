import React, { Component } from 'react';
import _ from 'lodash';

// Container Specific Component
import PhoneColumn from './phone';
import EmailColumn from './email';

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
				title='Phone Numbers'
			/>
		);
	}

	if (!_.isEmpty(previousNumbers)) {
		content.push(
			<PhoneColumn
				key={'prev-phones-' + uuid.v4()}
				numbers={previousNumbers}
				title='Previous Phone Numbers'
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

	return(
		<section id='contact' className='widget'>
			<h2 className='title'>Contact Information</h2>
			{content}
		</section>
	);
}

export default ContactSection;
