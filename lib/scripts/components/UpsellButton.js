import React, { Component } from 'react';
// import PremiumUpsellPrompt from './app';
import _ from 'lodash';

const UpsellButton = (props) => {

	return (
		<button type="submit" onTouchTap={upgrade}>
            UPGRADE!
        </button>
	);
}

export default UpsellButton;
