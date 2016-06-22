// TODO: Get this actually working without the 300ms delay

import config from '../config.js';
import React, { PropTypes, Component } from 'react';
import {Link as RouteLink} from 'react-router';
import _ from 'lodash';

export default class Link extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return <RouteLink {...this.props} onTouchTap={RouteLink.handleClick} />;
	}
};