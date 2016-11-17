import React from 'react';
import _ from 'lodash';
import Sticky from 'react-stickynode';

// Container Specific Component
import ContactPhone from './ContactPhone';
import ContactEmail from './ContactEmail';
import DefaultColumn from 'components/DefaultColumn';

import uuid from 'uuid';

const Contact = (props) => {
	let content = [];
	let { phones, emails, current } = props;
	let previousNumbers = phones.filter(phone => phone.is_old === true);
	let numbers = phones.filter(phone => phone.is_old !== true);

	if (!_.isEmpty(numbers)) {
		content.push(
			<ContactPhone
				key={'phones-' + uuid.v4()}
				numbers={numbers}
				title="Phone Numbers"
				current={current}
			/>
		);
	}

	if (!_.isEmpty(previousNumbers)) {
		content.push(
			<ContactPhone
				key={'prev-phones-' + uuid.v4()}
				numbers={previousNumbers}
				title="Previous Phone Numbers"
				current={current}
			/>
		);
	}

	if (!_.isEmpty(emails)) {
		content.push(
			<ContactEmail
				key={'emails-' + uuid.v4()}
				emails={_.map(emails, 'address')}
				current={current}
			/>
		);
	}

	// Fallback Details
	let fallback = {
		title: `Our extensive public records search did not uncover contact records ${name}.`,
		content: `We scanned for ${name}'s name among hundreds of millions of records from local, state, and federal databases in all 50 states.`
	};

	return(
		<section id="contact" className="widget">
			<Sticky>
				<h2 className="title">Contact Information</h2>
			</Sticky>

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

Contact.propTypes = {
	phones: React.PropTypes.array,
	emails: React.PropTypes.array,
	current: React.PropTypes.string
};

export default Contact;
