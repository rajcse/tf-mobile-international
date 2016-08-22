import React, { PropTypes } from 'react';
import uuid from 'uuid';
import _ from 'lodash';

import ProfileColumn from './profile';
import LinksColumn from '../shared/LinksColumn';
import DefaultColumn from '../shared/DefaultColumn';

const SocialSection = (props) => {
	let { accounts, links } = props;

	// Fallback Details
	let fallback = {
		title: `Our extensive public records search did not uncover social records for ${name}.`,
		content: `We scanned for ${name}'s name among hundreds of millions of records from local, state, and federal databases in all 50 states.`,
	};

	return(
		<section id="social" className="widget">
			<h2 className="title">Online Accounts</h2>

			{ accounts.length > 0 ?
				<div>
					<div className="label">
						<h4>Social Accounts</h4>
					</div>

					{accounts.map(account =>
						<ProfileColumn
							key={`socials-${uuid.v1()}`}
							social={account} />
					)}

					<hr />

					<div className="label">
						<h4>Related Links</h4>
					</div>

					{ !_.isEmpty(links) ?
						<LinksColumn
							key={'links-' + uuid.v1()}
							title="Related Links"
							links={links}
							classes="links"
						/>
					: null }
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
	links: PropTypes.array.isRequired,
};

export default SocialSection;
