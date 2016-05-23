'use strict';

import config from './config';
import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import tfActions from './actions/tfActions';
import Search from './components/Search';

var styles = {
	app: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: config.themeStyles.brandBlue
	}
};

class TfApp extends Component {

	constructor() {
		super();

		this.state = {
		};
	}

	render() {
		return (
			<div>
				<h1>Hello World!</h1>
				<Search />
			</div>
		);
	} 
};

window.initializeApp = function() {
	ReactDOM.render(
		<TfApp />,
		document.querySelector('#app')
	);
};