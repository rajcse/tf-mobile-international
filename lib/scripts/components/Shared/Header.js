import React from 'react';
import {hashHistory} from 'react-router';
import Svg from '../Svg';

const Header = (props) => {
	let title = props.title ? <h1>{props.title}</h1> : <Svg className="logo" svg="tfLogo" />;
	
	return (
		<header>
			{props.backButton ? <span onTouchTap={props.buttonHandler ? props.buttonHandler : () => hashHistory.goBack()} /> : null }
			{title}
		</header>
	);
};

export default Header;