import React, { Component } from 'react';
import _ from 'lodash';

// Container Specific Component
import PhoneColumn from './phone';
import EmailColumn from './email';

import uuid from 'uuid';

const ContactSectionView = (props) => {
	let content = [];

	if (!_.isEmpty(props.phones)) {
		content.push(
			<PhoneColumn
				key={'phones-' + uuid.v1()}
				numbers={props.phones}
			/>
		);
	}

	if (!_.isEmpty(props.emails)) {
		content.push(
			<EmailColumn
				key={'emails-' + uuid.v1()}
				emails={props.emails}
			/>
		);
	}

	return(
		<section id='contact' className='widget'>
			<h2>Contact Information:</h2>
			{content}
		</section>
	);
}

export default ContactSectionView;
