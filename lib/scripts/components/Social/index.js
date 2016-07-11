import React, { Component, PropTypes } from 'react';
import ProfileColumn from './profile';

import uuid from 'uuid';

const SocialSectionView = (props) => {
	let { accounts } = props;

	return(
		<section id='social' className='widget'>
			<h2 className='title'>Social Profiles</h2>
			{accounts.map(account =>
				<ProfileColumn
					key={`socials-${uuid.v1()}`}
					social={account}
				/>
			)}
		</section>
	);
}

SocialSectionView.propTypes = {
	accounts: PropTypes.array.isRequired,
}

export default SocialSectionView;
