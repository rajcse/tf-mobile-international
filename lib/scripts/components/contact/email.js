import constants from '../../constants/pubRecConstants';
import React from 'react';
import _ from 'lodash';
import uuid from 'uuid';
import TeaserLink from '../TeaserLink';

const EmailColumn = (props) => {
	let { emails, current } = props;

	let providers = [];

	emails.map((email) => {
		providers.push(
			_.split(email, '@', 2)[1]
		);
	});

	return (
		<div className="table simple-column row">
			<div className="label label-full">
				<h4>Email Addresses</h4>
			</div>

			<div className="content content-full">
				<ul>
					{ emails.map((email, i) =>
						<li key={uuid.v4()}>
							<h4>{email}</h4>

							<p>{_.upperCase(providers[i].substring(0, providers[i].indexOf('.')))}</p>

							{ _.isUndefined(current) || current !== email ?
								<p>
									<TeaserLink
										key={uuid.v4()}
										teaser={{recordData: {email: {address: email}}}}
										recordType={constants.recordTypes.EMAIL}
										classes="btn-link btn"> View Email Report
									</TeaserLink>
								</p>
							: null }
							<hr/>
						</li>
					) }
				</ul>
			</div>
		</div>
	);
};

EmailColumn.propTypes = {
	emails: React.PropTypes.array.isRequired,
	current: React.PropTypes.string
};

export default EmailColumn;
