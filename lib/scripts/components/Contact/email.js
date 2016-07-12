import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

const EmailColumn = (props) => {
	let { emails } = props;
	let providers = [];

	emails.map((email, i) => {
		providers.push(
			_.split(email, '@', 2)[1]
		);
	});

	return (
		<div className='table row'>
			<div className='label'>
				<h4>Email Addresses</h4>
			</div>

			<div className='content content-full'>
				<ul>
					{ emails.map((email, i) =>
						<li key={i}>
							<p>{email}</p>

							<p>
								<small>
									Provider: <span>{providers[i].substring(0, providers[i].indexOf('.'))}</span>
								</small>
							</p>

							<p><button className='btn-link pull-right'>Email Report</button></p>
						</li>
					) }
				</ul>
			</div>
		</div>
	);
}

EmailColumn.propTypes = {
	emails: PropTypes.array.isRequired
}

export default EmailColumn;