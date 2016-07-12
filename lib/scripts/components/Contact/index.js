import React, { Component } from 'react';
import _ from 'lodash';

// Container Specific Component
import PhoneColumn from './phone';
import EmailColumn from './email';

import uuid from 'uuid';

const ContactSectionView = (props) => {
	let content = [];

	let { phones, emails } = props;

	if (!_.isEmpty(phones)) {
		content.push(
			<PhoneColumn
				key={'phones-' + uuid.v1()}
				numbers={phones}
			/>
		);
	}

	if (!_.isEmpty(emails)) {
		content.push(
			<EmailColumn
				key={'emails-' + uuid.v1()}
				emails={emails}
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

export default ContactSectionView;