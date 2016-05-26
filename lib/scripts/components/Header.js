import config from '../config.js';
import React, { Component } from 'react';

export default class Header extends Component {

	render() {
		return (
			<header style={styles.header}>
				<img style={styles.logo} src="/img/tf-logo-white.png"/>
			</header>
		);
	}
};

var styles = {
    header: {
        backgroundColor: config.themeStyles.brandGreen,
        padding: '10px 0',
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
        width: 140
    }
};
