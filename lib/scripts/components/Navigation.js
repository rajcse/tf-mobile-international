import config from '../config.js';
import React, { Component } from 'react';

export default class Navigation extends Component {

	render() {
		return (
			<nav style={styles.navigation}>
				<ul style={styles.navBar}>
					<li style={styles.navItem}>H</li>
					<li style={styles.navItem}>S</li>
					<li style={styles.navItem}>C</li>
					<li style={styles.navItem}>A</li>
				</ul>
			</nav>
		);
	}
};

var styles = {
    navigation: {
        backgroundColor: config.themeStyles.brandWhite,
        padding: '15px 0',
		position: 'fixed',
		bottom: 0,
		left: 0,
		width: '100%',
		borderTop: '1px solid ' + config.themeStyles.brandGray,
		zIndex: 99999
    },
	navBar: {
		listStyle: 'none',
		margin: 0,
		padding: 0
	},
    navItem: {
        display: 'block',
		float: 'left',
		width: '25%',
		boxSizing: 'border-box',
		padding: '0 10px',
		textAlign: 'center'
    }
};
