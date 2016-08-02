import React, { Component, PropTypes } from 'react';
import uuid from 'uuid';
import _ from 'lodash';

import ProfileColumn from './profile';
import LinksColumn from '../Shared/LinksColumn';

const SocialSectionView = (props) => {
	let { accounts, links } = props;

	return(
		<section id='social' className='widget'>
			<h2 className='title'>Social Profiles</h2>
			{accounts.map(account =>
				<ProfileColumn
					key={`socials-${uuid.v1()}`}
					social={account}
				/>
			)}

			<h3 className='title'>Related Links</h3>
			{ !_.isEmpty(links) ?
				<LinksColumn
					key={'links-' + uuid.v1()}
					title='Related Links'
					links={links}
					classes='links'
				/>
			: null }
		</section>
	);
}

SocialSectionView.propTypes = {
	accounts: PropTypes.array.isRequired,
}

export default SocialSectionView;
