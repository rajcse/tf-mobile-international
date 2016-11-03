import React, { PropTypes } from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import Sticky from 'react-stickynode';
// import constants from '../../constants/pubRecConstants';

import ProfileColumn from './profile';
import LinksColumn from '../shared/LinksColumn';
import DefaultColumn from '../shared/DefaultColumn';
// import SimpleInline from '../shared/SimpleInline';

const SocialSection = (props) => {
	// let { accounts, links, usernames } = props;
	let { accounts, links } = props;

	// Fallback Details
	let fallback = {
		title: `Our extensive public records search did not uncover social records for ${name}.`,
		content: `We scanned for ${name}'s name among hundreds of millions of records from local, state, and federal databases in all 50 states.`,
	};

	return(
		<section id="social" className="widget">
			<Sticky>
				<h2 className="title">Social Profiles</h2>
			</Sticky>

			{ accounts.length > 0 ?
				<div>
					<div className="label">
						<h4>Social Accounts</h4>
					</div>

					{accounts.map(account =>
						<ProfileColumn
							key={`socials-${uuid.v4()}`}
							social={account} />
					)}

					<hr />

					<div className="label">
						<h4>Related Links</h4>
					</div>

					{ !_.isEmpty(links) ?
						<LinksColumn
							key={'links-' + uuid.v4()}
							title="Related Links"
							links={links}
							classes="links"
						/>
					: null }

					{/* { !_.isEmpty(usernames) ?
						<div>
						<div className="label">
						<h4>Usernames</h4>
						</div>

						{ usernames.map((username) => (
						<SimpleInline
						key={uuid.v4()}
						title={['Username', 'Since']}
						contents={[username.content , _.has(username,'date_first_seen.date.month') ? `${constants.months[username.date_first_seen.date.month]}, ${username.date_first_seen.date.day} ${username.date_first_seen.date.year}` : null]}
						classes="inline-half"
						/>
						)) }
						</div>
					: null } */}
				</div>
					: <DefaultColumn
						name={name}
						icon="social"
						title={fallback.title}
						content={fallback.content}
						type="social"
					/> }
		</section>
	);
};

SocialSection.propTypes = {
	accounts: PropTypes.array.isRequired,
	usernames: PropTypes.array.isRequired,
	links: PropTypes.array.isRequired,
};

export default SocialSection;
