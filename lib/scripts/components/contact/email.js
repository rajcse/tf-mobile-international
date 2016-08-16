import constants from '../../constants/pubRecConstants';
import React from 'react';
import _ from 'lodash';
import TeaserLink from '../TeaserLink';

const EmailColumn = (props) => {
	let { emails } = props;
	let providers = [];

	emails.map((email, i) => {
		providers.push(
			_.split(email, '@', 2)[1]
		);
	});

	return (
		<div className='table simple-column row'>
			<div className='label label-full'>
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

							<p>
								<TeaserLink
									teaser={email}
									classes='btn-link btn'
									recordType={constants.recordTypes.EMAIL}> Email Report
								</TeaserLink>
							</p>
						</li>
					) }
				</ul>
			</div>
		</div>
	);
}

EmailColumn.propTypes = {
	emails: React.PropTypes.array.isRequired
}

export default EmailColumn;
