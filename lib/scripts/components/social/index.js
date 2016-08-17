import React, { PropTypes } from 'react';
import uuid from 'uuid';
import _ from 'lodash';

import ProfileColumn from './profile';
import LinksColumn from '../shared/LinksColumn';

const SocialSection = (props) => {
	let { accounts, links } = props;

	return(
		<section id="social" className="widget">
			<h2 className="title">Online Accounts</h2>

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
		</section>
	);
};

SocialSection.propTypes = {
	accounts: PropTypes.array.isRequired,
	links: PropTypes.array.isRequired,
};

export default SocialSection;
