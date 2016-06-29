import React, { Component } from 'react';
import SocialSource from './SocialSource';

const SocialSectionView = (props) => {

	return(
		<section id="social"> <h2>Social Profiles:</h2>  
			{props.sources.map(source => <SocialSource key={'socials-' + Math.ceil(Math.random()*100000)} data={source} />)}
		</section>
	);
}

export default SocialSectionView;