import React, { Component, PropTypes } from 'react';

const EmailColumn = (props) => {
	let { emails } = props;
	let providers = [];

	emails.map((email, i) => {
		providers.push(
			email.match('/@(.*)\.\w*$/')
		);
	});

	return (
		<div className='table row'>
			<h4 className='label'>Email Addresses</h4>

			<ul>
				{ emails.map((email, i) =>
					<li key={i}>
						<p>{email}</p>
						<p>Provider: {providers[i]}</p>
					</li>
				) }
			</ul>
		</div>
	);
}

EmailColumn.propTypes = {
	emails: PropTypes.array.isRequired
}

export default EmailColumn;
