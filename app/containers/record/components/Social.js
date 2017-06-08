import React, { PropTypes } from 'react';
import uuid from 'uuid';
import _ from 'lodash';

import SocialProfile from './SocialProfile';
import SocialProfileLinkedIn from './SocialProfileLinkedIn';
import SocialProfileFacebook from './SocialProfileFacebook';
import LinksColumn from 'components/LinksColumn';
import DefaultColumn from 'components/DefaultColumn';

const Social = (props) => {
	let { accounts, links } = props,
		fullProfiles = [],
		otherProfiles = [],
		fullProfileList = ['Facebook', 'LinkedIn'], // our desired 'fancy' profiles
		fallback = {
			title: `Our extensive public records search did not uncover social records for ${name}.`,
			content: `We scanned for ${name}'s name among hundreds of millions of records from local, state, and federal databases in all 50 states.`
		};

	/**
	 * -------------------------------------------
	 * Seperate the 'fancy' profiles from the rest
	 * -------------------------------------------
	 */

	fullProfiles = accounts.filter(account => {
		if(fullProfileList.includes(account['name'])) {
			return true;
		} else {
			otherProfiles.push(account);
			return false;
		}
	});

	/**
	 * -------------------------------------------
	 * Remove duplicate profiles of the same name
	 * if they contain no other data
	 * -------------------------------------------
	 */

	otherProfiles = otherProfiles.filter((account, i, self) => {
		if(!account['@origin_url'] && _.isEmpty(account.tags)) {
			return self.map(val => val['name']).indexOf(account['name']) === i;
		} else {
			return account;
		}
	});

	return(
		<section id="social" className="widget">
			<h2 className="title">Social Profiles</h2>

			{ accounts.length > 0 ?
				<div>
					{/**
					 * -------------------------------------------
					 * Render comprehensive profiles like
					 * Facebook, Twitter, LinkedIn, etc
					 * -------------------------------------------
					 */}

					<div className="label">
						<h4>Social Accounts</h4>
					</div>

					{fullProfiles.map(account => {
						// TODO: Make a Twitter component when we have their API integrated
						switch(account.name) {
							case 'LinkedIn':
								return (
									<SocialProfileLinkedIn
										key={`socials-${uuid.v4()}`}
										social={account}
									/>
								);
							case 'Facebook':
								return (
									<SocialProfileFacebook
										key={`socials-${uuid.v4()}`}
										social={account}
									/>
								);
						}
					})}

					{/**
					 * -------------------------------------------
					 * Render all of the other accounts
					 * -------------------------------------------
					 */}

					<div className="label">
						<h4>Other Accounts</h4>
					</div>

					{otherProfiles.map(account =>
						<SocialProfile
							key={`socials-${uuid.v4()}`}
							social={account}
						/>
					)}

					{/**
					 * -------------------------------------------
					 * Render all of the related links
					 * -------------------------------------------
					 */}

					<div className="label">
						<h4>Related Links</h4>
					</div>

					{ !_.isEmpty(links) &&
						<LinksColumn
							key={'links-' + uuid.v4()}
							title="Related Links"
							links={links}
							classes="links"
						/>
					}
				</div>
					: <DefaultColumn
						name={name}
						icon="social"
						title={fallback.title}
						content={fallback.content}
						type="social"
					/>
			}
		</section>
	);
};

Social.propTypes = {
	accounts: PropTypes.array.isRequired,
	usernames: PropTypes.array.isRequired,
	links: PropTypes.array.isRequired
};

export default Social;
