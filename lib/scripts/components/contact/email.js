import constants from '../../constants/pubRecConstants';
import React from 'react';
import _ from 'lodash';
import SearchLink from '../SearchLink';

const EmailColumn = (props) => {
	let { emails } = props;
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
						<li key={i}>
							<h4>{email}</h4>

							<p>{_.upperCase(providers[i].substring(0, providers[i].indexOf('.')))}</p>

							<p>
								<SearchLink
									criteria={{
										type: constants.recordTypes.EMAIL,
										query: {
											email: email
										},
										text: email
									}}
								classes="btn-link btn"> View Email Report
								</SearchLink>
							</p>
						</li>
					) }
				</ul>
			</div>
		</div>
	);
};

EmailColumn.propTypes = {
	emails: React.PropTypes.array.isRequired
};

export default EmailColumn;
