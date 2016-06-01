import config from '../config.js';
import React, { Component } from 'react';
import {Link, IndexLink} from 'react-router';

export default class Navigation extends Component {

	render() {
		return (
			<nav style={styles.navigation}>
				<ul style={styles.navBar}>
					<li style={styles.navItem}><IndexLink to="/" style={styles.link} activeStyle={styles.active}>H</IndexLink></li>
					<li style={styles.navItem}><Link to="/search" style={styles.link} activeStyle={styles.active}>S</Link></li>
					<li style={styles.navItem}><Link to="/support" style={styles.link} activeStyle={styles.active}>C</Link></li>
					<li style={styles.navItem}><Link to="/account" style={styles.link} activeStyle={styles.active}>A</Link></li>
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
		height: 50,
		boxSizing: 'border-box',
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
    },
	link: {
		color: config.themeStyles.brandBlack
	},
	active: {
		color: config.themeStyles.brandBlue,
		textShadow: '0 0 3px ' + config.themeStyles.brandBlue
	}
};
