import React from 'react';
import {hashHistory} from 'react-router';
import Svg from 'components/svg/Svg';

const Header = (props) => {
	const limitLength = (str, length) => `${str.substring(0, length)}...`;
	let title = props.title ? <h1>{props.title.length > 20 ? limitLength(props.title, 20) : props.title}</h1> : <Svg className="logo" svg="tfLogo" />;

	return (
		<header>
			{props.backButton ? <span onClick={props.buttonHandler ? props.buttonHandler : () => hashHistory.goBack()} /> : null }
			{title}
		</header>
	);
};

Header.propTypes = {
	title: React.PropTypes.string,
	backButton: React.PropTypes.bool,
	buttonHandler: React.PropTypes.func
};

export default Header;
