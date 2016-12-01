import React from 'react';
import _ from 'lodash';
import {hashHistory} from 'react-router';
import Svg from 'components/svg/Svg';

const Header = (props) => {
	const limitLength = (str, length) => `${str.substring(0, length)}...`;
	let title = props.title ? <h1>{props.title.length > 20 ? limitLength(props.title, 20) : props.title}</h1> : <Svg className="logo" svg="tfLogo" />;

	return (
		<header>
			{props.backButton ?
				<span className="header-btn" onClick={props.buttonHandler ? props.buttonHandler : () => hashHistory.goBack()} />
			: null }

			{title}

			{ _.isUndefined(props.archiveStatus) && _.isUndefined(props.archiveStatusToggle) ? null :
				props.archiveStatus ? <span className="archive-done" onClick={() => props.archiveStatusToggle()}>Done</span>
				: <span className="archive-edit" onClick={() => props.archiveStatusToggle()}>Edit</span>
			}
		</header>
	);
};

Header.propTypes = {
	title: React.PropTypes.string,
	backButton: React.PropTypes.bool,
	archiveStatus: React.PropTypes.bool,
	archiveStatusToggle: React.PropTypes.func,
	buttonHandler: React.PropTypes.func
};

export default Header;
