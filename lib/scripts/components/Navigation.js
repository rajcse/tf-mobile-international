import config from '../config.js';
import React, { Component } from 'react';
import {Link, IndexLink} from 'react-router';
import Svg from './Svg';

export default class Navigation extends Component {

	render() {
		return (
			<nav style={styles.navigation}>
				<ul style={styles.navBar}>
					<li style={styles.navItem}>
						<IndexLink to="/" style={styles.navLink} activeClassName="active-nav">
							<Svg svg="navHome" style={_.merge({}, styles.navIcon, {width: 20})} />
							<span style={styles.navText}>Home</span>
						</IndexLink>
					</li>
					<li style={styles.navItem}>
						<Link to="/search" style={styles.navLink} activeClassName="active-nav">
							<Svg svg="navSearch" style={_.merge({}, styles.navIcon, {width: 25})} />
							<span style={styles.navText}>Search</span>
						</Link>
					</li>
					<li style={styles.navItem}>
						<Link to="/support" style={styles.navLink} activeClassName="active-nav">
							<Svg svg="navSupport" style={_.merge({}, styles.navIcon, {width: 18})} />
							<span style={styles.navText}>Help</span>
						</Link>
					</li>
					<li style={styles.navItem}>
						<Link to="/account" style={styles.navLink} activeClassName="active-nav">
							<Svg svg="navAccount" style={_.merge({}, styles.navIcon, {width: 17})} />
							<span style={styles.navText}>Account</span>
						</Link>
					</li>
				</ul>
			</nav>
		);
	}
};

var styles = {
    navigation: {
        backgroundColor: config.themeStyles.brandWhite,
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
		padding: 0,
		overflow: 'hidden',
		height: '100%'
	},
    navItem: {
		position: 'relative',
        display: 'block',
		float: 'left',
		width: '25%',
		height: '100%',
		boxSizing: 'border-box',
		textAlign: 'center'
    },
	navLink: {
		display: 'block',
		position: 'absolute',
		left: 0,
		top: 0,
		boxSizing: 'border-box',
		width: '100%',
		height: '100%',
		padding: '10px',
		color: config.themeStyles.brandBlack
	},
	navIcon: {
		display: 'block',
        margin: '0 auto'
	},
	navText: {
		display: 'block',
		position: 'absolute',
		bottom: 7,
		left: 0,
		width: '100%',
		fontSize: 10
	},
	active: {
		color: config.themeStyles.brandBlue,
		textShadow: '0 0 3px ' + config.themeStyles.brandBlue
	}
};
