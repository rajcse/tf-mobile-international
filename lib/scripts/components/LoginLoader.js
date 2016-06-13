import config from '../config.js';
import constants from '../constants/pubRecConstants';
import React, { Component } from 'react';

const LoginLoader = (props) => {
	return (
		<div style={styles.loader}>
			<div style={styles.loadingText}>
				Logging In...
			</div>
		</div>
	);
}

export default LoginLoader;

var styles = {
	loader: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: '#fff'
	},
	loadingText: {
		position: 'absolute',
		top: '50%',
		width: '100%',
		textAlign: 'center',
		textTransform: 'uppercase',
		transform: 'translateY(-50%)',
		fontSize: '20px'
	}
};
