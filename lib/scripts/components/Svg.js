import config from '../config.js';
import React, { Component } from 'react';
// import fs from 'fs';
var fs = require('fs');

// console.log(fs);
var logo = fs.readFileSync(require.resolve('../../img/tf-logo-white.svg'), 'utf8');

export default class Header extends Component {

	render() {
		return (
			<header style={styles.header} dangerouslySetInnerHTML={{__html: logo}}>
				{/*<img style={styles.logo} src="img/tf-logo-white.svg"/>*/}
			</header>
		);
	}
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
