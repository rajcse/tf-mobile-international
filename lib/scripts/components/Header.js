import config from '../config.js';
import React, { Component } from 'react';
import Svg from './Svg';

export default class Header extends Component {

	render() {
		return (
			<header style={styles.header}>
				<Logo style={styles.logo}/>
			</header>
		);
	}
};

const Logo = (props) => {
	return (
		<Svg svg="tfLogoWhite" style={styles.logo} />
	);
};

var styles = {
    header: {
        backgroundColor: config.themeStyles.brandGreen,
        padding: '20px 0 10px',
		height: 20, 
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		zIndex: 99999
    },
    logo: {
        display: 'block',
        margin: '0 auto',
        width: 140,
		height: 19
    }
};
