import React, { Component } from 'react';
import Svg from '../Svg';

export default class Header extends Component {

	render() {
		return (
			<header>
				<Svg className="logo" svg="tfLogo" />
			</header>
		);
	}
};